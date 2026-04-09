import type { transaction } from "types/supabase";
import { formatRelative } from "date-fns";

function LogCard({ transaction }: { transaction: transaction }) {
    const formattedDateString = formatRelative(
        transaction.creationTimestamp,
        new Date(),
    ).toString();

    return (
        <article className="columns">
            <div className="column is-three-quarters">
                {transaction.logger.firstName}
                {transaction.quantityChanged > 0 && "+"}
                {transaction.quantityChanged} {transaction.product.name}
            </div>
            <div className="column">{formattedDateString}</div>
        </article>
    );
}

export default LogCard;
