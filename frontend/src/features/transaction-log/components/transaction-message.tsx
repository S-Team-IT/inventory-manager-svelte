import type { transaction } from "types/supabase";
import { formatRelative } from "date-fns";
import { convertToSGTime } from "lib/format-dates";

function TransactionCard({ transaction }: { transaction: transaction }) {
    const sgDateTime = convertToSGTime(transaction.creationTimestamp);
    const formattedDateString = formatRelative(
        sgDateTime,
        new Date(),
    ).toString();

    return (
        <>
            <article className="columns">
                <div className="column">
                    {transaction.logger.firstName}{" "}
                    {transaction.quantityChanged > 0 && "+"}
                    {transaction.quantityChanged} {transaction.product.name}
                </div>
                <div className="column has-text-right">
                    {formattedDateString}
                </div>
            </article>
            <hr />
        </>
    );
}

export default TransactionCard;
