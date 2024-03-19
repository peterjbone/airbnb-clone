"use client";

import axios from "axios";

import { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsloading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsloading(true);

		//prettier-ignore
		axios.post("/api/register", data)
      .then(() => {
        toast.success("Account created!")
        registerModal.onClose();
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error("Something went wrong!")
      })
      .finally(() => {
        setIsloading(false)
      })
	};

	/**
	 * This function is used to close the login modal and open
	 * the Register Modal if the user doesnt have an account.
	 */
	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, []);

	//* BODY OF REGISTER MODAL | LOGIN WITH CREDENTIALS
	//prettier-ignore
	const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an Account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required/>
    </div>
  )

	//* FOOTER OF REGISTER MODAL | REGISTER WITH GOOGLE AND GITHUB
	//prettier-ignore
	const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}/>
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')} />
      <div className="
       text-neutral-500
       text-center
       mt-4
       font-light">
        <div className="flex flex-row items-center  justify-center gap-2">
          <div>
          Already have an account?
          </div>
          <div
            onClick={toggle}
            className="
            text-neutral-800
            cursor-pointer
            hover:underline
            decoration-white
            ">
          Login
          </div>
        </div>
       </div>
    </div>
  )

	//prettier-ignore
	return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      title="Register"
      body={bodyContent}
      footer={footerContent}/>
  )
};

export default RegisterModal;
