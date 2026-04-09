// import { useState } from "react";
// import Modal from "react-modal";

// const modalStyles = {
//     overlay: { backgroundColor: "rgb(255, 255, 255, 0.8)" },
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//     },
// };

// Modal.setAppElement("#root");

// const [modalIsOpen, setIsOpen] = useState(false);

// function openModal() {
//     setIsOpen(true);
// }

// function closeModal() {
//     setIsOpen(false);
// }

// <Modal
//     isOpen={modalIsOpen}
//     onRequestClose={closeModal}
//     contentLabel="Delivery Order Form"
//     style={modalStyles}
// >
//     <form action="">
//         <div className="field">
//             <label htmlFor="deliveryID">Delivery Order Number: </label>
//             <div className="control">
//                 <input
//                     type="text"
//                     className="input"
//                     name="deliveryID"
//                     placeholder="DO Number"
//                     required
//                 />
//             </div>
//         </div>
//         <div className="field">
//             <label htmlFor="deliveryDate">Delivery Date:</label>
//             <div className="control">
//                 <input
//                     type="date"
//                     className="input"
//                     name="deliveryDate"
//                     required
//                 />
//             </div>
//         </div>
//         <div className="field is-grouped">
//             <div className="control">
//                 <button type="submit" className="button is-primary">
//                     Submit
//                 </button>
//             </div>
//             <div className="control">
//                 <button className="button" onClick={closeModal}>
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     </form>
// </Modal>;

// async function handleDeliveryOrderForm(formData: FormData) {
//     // closeModal();
//     const deliveryID = formData.get("deliveryID") as string;
//     const deliveryDate = new Date(
//         Date.parse(formData.get("deliveryDate") as string),
//     );
//     await insertDeliveryOrder(deliveryID, deliveryDate);
// }
