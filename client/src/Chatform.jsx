import React from "react";
import { useMutation } from "@tanstack/react-query";
import { MESSAGE } from "../utils/ApiRoutes";
import { FetchQuery } from "../utils/ApiCall";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

const handlRegisterationPost = async (data) => {
  return (await FetchQuery(MESSAGE, data))?.data;
};
export default function Chatform() {
  const form = useForm({
    initialValues: {
      question: "",
    },
  });
  const { mutate, isLoading } = useMutation(handlRegisterationPost);
  const handleRegister = (data) => {
    mutate(data, {
      onSuccess: async () => {
        console.log("success");
      },
      onError: (e) => {
        console.log(e.response.data);
      },
    });
  };

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
        <TextInput {...form.getInputProps("message")} />

        <Button
          loading={isLoading}
          type="submit"
          fullWidth
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
