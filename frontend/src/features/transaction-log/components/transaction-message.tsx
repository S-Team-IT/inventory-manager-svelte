import type { transaction } from "types/supabase";
import { convertToSGTime, formatRelativeToToday } from "lib/format-dates";

interface props {
    transaction: transaction;
    handleOpenModal: () => void;
    selectTransaction: (transaction: transaction) => void;
}

function TransactionCard({
    transaction,
    handleOpenModal,
    selectTransaction,
}: props) {
    const sgDateTime = convertToSGTime(transaction.creationTimestamp);
    const relativeDateString = formatRelativeToToday(sgDateTime);

    function handleSelectTransaction(transaction: transaction) {
        //transaction squared
        selectTransaction(transaction);
        handleOpenModal();
    }

    return (
        <section>
            <a onClick={() => handleSelectTransaction(transaction)}>
                <article className="columns">
                    <div className="column">
                        {transaction.logger.firstName}{" "}
                        {transaction.quantityChanged > 0 && "+"}
                        {transaction.quantityChanged} {transaction.product.name}
                    </div>
                    <div className="column has-text-right">
                        {relativeDateString}
                    </div>
                </article>
            </a>
            <hr />
        </section>
    );
}

export default TransactionCard;
