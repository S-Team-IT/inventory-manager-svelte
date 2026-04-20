import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { SessionContext } from "lib/context/context";
import { insertBulkBalanceTransactions } from "lib/database/balance-transactions-api";
import { getProjectBalance, updateProjectBalance } from "lib/database/project-api";
import Mexp from "math-expression-evaluator";
import { useContext, useEffect, useState } from "react";
import type { balanceTransaction } from "types/supabase";

export default function BalanceManager() {
  const [balanceExpression, setBalanceExpression] = useState("");
  const [initialBalance, setInitialBalance] = useState(0); //For resets and so the final value can be easily calculated with balanceChanges(cause react hooks are async and time travel)
  const [previousBalance, setPreviousBalance] = useState(0); //To calculate the difference from balanceExpression and add to balanceChanges
  const [balanceChanges, setBalanceChanges] = useState<balanceTransaction[]>([]);
  const session = useContext(SessionContext);

  useEffect(() => {
    async function fetchBalance() {
      const { balance } = await getProjectBalance();
      setBalanceExpression(balance.toString());
      setInitialBalance(balance);
      setPreviousBalance(balance);
    }
    fetchBalance();
  }, []);

  function handleBalanceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBalanceExpression(e.target.value);

    //If it is a number, it means an expression has just been calculated. Thus, previousBalance needs to be updated.
    if (!isNaN(+e.target.value)) {
      setPreviousBalance(+e.target.value);
    }
  }

  function handleBalanceFormSubmit(e?: React.SubmitEvent<HTMLFormElement>) {
    // In the event balanceExpression has an unresolved expression when changes are confirmed, it must be called manually
    if (e) e.preventDefault();
    if (!session) return balanceChanges;

    const mexp = new Mexp();
    const result = mexp.eval(balanceExpression);
    setBalanceExpression(result.toString());
    setPreviousBalance(result);
    const difference = result - previousBalance;

    const newTransaction: balanceTransaction = {
      project_id: "1",
      balance_changed: difference,
      created_at: new Date(),
      logger_id: session.user.id,
    };
    const updatedChanges = [...balanceChanges, newTransaction];
    setBalanceChanges(updatedChanges);
    return updatedChanges;
  }

  function handleCancel() {
    setBalanceChanges([]);
    setBalanceExpression(initialBalance.toString());
    setPreviousBalance(initialBalance);
  }

  async function handleConfirm() {
    let finalChanges = balanceChanges;

    //Check if there is an expression when confirming and call handleBalanceFormSubmit if there is
    if (isNaN(+balanceExpression)) {
      finalChanges = handleBalanceFormSubmit();
    }
    await insertBulkBalanceTransactions(finalChanges);
    let finalDifference = 0;
    finalChanges.forEach(({ balance_changed }) => {
      finalDifference += balance_changed;
    });
    await updateProjectBalance(finalChanges[0].project_id, initialBalance + finalDifference);
  }

  return (
    <Stack direction="row" spacing={2}>
      <form onSubmit={handleBalanceFormSubmit}>
        <TextField
          placeholder={initialBalance.toFixed(2)}
          variant="standard"
          label="Balance"
          value={balanceExpression}
          onChange={handleBalanceChange}
          helperText="Math expressions can be calculated with Enter."
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            },
          }}
        />
      </form>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="contained" onClick={handleConfirm}>
        Confirm
      </Button>
    </Stack>
  );
}
