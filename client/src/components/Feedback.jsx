import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editTheFeedback, registerFeedback } from "../redux/user/userSlice";
import { Button, Textarea } from "flowbite-react";

function Feedback({ onSubmit, feedback, closeModal }) {
  const [NewFeedback, setNewFeedback] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(registerFeedback({ NewFeedback }));
      const result = unwrapResult(actionResult);
      toast.success(result.message);
      onSubmit(result.result);
      closeModal();
      setNewFeedback("");
    } catch (error) {
      toast.error(error.message || "Feedback submission failed");
    }
  };
  const updateFeedback = async () => {
    try {
      const actionResult = await dispatch(
        editTheFeedback({ NewFeedback, id: feedback?._id })
      );
      const result = unwrapResult(actionResult);
      toast.success(result.message);
      onSubmit(result.result);
      closeModal();
      setNewFeedback("");
    } catch (error) {
      toast.error(error.message || "Feedback submission failed");
    }
  };

  useEffect(() => {
    setNewFeedback(feedback?.feedback);
  }, [feedback]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Submit Feedback
      </h2>
      <Textarea
        name="feedback"
        rows="4"
        value={NewFeedback}
        onChange={(e) => setNewFeedback(e.target.value)}
      />
      <div className="mt-4">
        <Button
          type="button"
          onClick={feedback ? updateFeedback : handleSubmit}
        >
          {feedback ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
