import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import Feedback from "./Feedback";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteTheFeedback } from "../redux/user/userSlice";

function DisplayFeed({ feedback, onSubmit, deleteit }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const deleteFeedback = async () => {
    const result = await dispatch(deleteTheFeedback({ id: feedback._id }));
    const data = await unwrapResult(result);
    console.log(data);
    deleteit(data.result);
    toast.success(data.message);
  };

  return (
    <>
      <Card className="max-w-sm flex flex-col h-full">
        <div className="text-gray-800 text-base mb-2">{feedback.feedback}</div>
        <div className="text-sm text-gray-500">
          {new Date(feedback.createdAt).toLocaleString()}
        </div>
        <div className="flex mt-auto gap-2">
          <Button color="green" onClick={() => setOpenModal(true)}>
            Edit
          </Button>
          <Button color="red" onClick={() => deleteFeedback()}>
            Delete
          </Button>
        </div>
      </Card>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Update Feedback</ModalHeader>
        <ModalBody>
          <Feedback
            feedback={feedback}
            onSubmit={onSubmit}
            closeModal={() => setOpenModal(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default DisplayFeed;
