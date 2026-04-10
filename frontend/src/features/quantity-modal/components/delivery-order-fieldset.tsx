import type { supplier } from "types/supabase";

type props = {
    suppliers: supplier[];
};

function DeliveryOrderFieldset({ suppliers }: props) {
    return (
        <>
            <div className="field">
                <label className="label" htmlFor="orderID">
                    Delivery Order Number:
                </label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        name="orderID"
                        placeholder="DO Number"
                        required
                        id="orderID"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="orderDate">
                    Delivery Date:
                </label>
                <div className="control">
                    <input
                        type="date"
                        className="input"
                        name="orderDate"
                        required
                        id="orderDate"
                    />
                </div>
            </div>
            <div className="field mb-3">
                <label className="label" htmlFor="supplierID">
                    Supplier
                </label>
                <div className="control">
                    <div className="select">
                        <select name="supplierID" id="supplierID">
                            <option>Select dropdown</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeliveryOrderFieldset;
