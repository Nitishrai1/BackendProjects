import { useForm } from "react-hook-form";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isvalid },
  } = useForm({ mode: "onChange" });

  function OnSubmit() {
    console.log("form submiteed succesfuly");
  }
  return (
  <form onSubmit={handleSubmit(OnSubmit)}>
    <div>
     <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          {...register('firstname', {
            required: 'Name must be provided',
            minLength: {
              value: 20,
              message: 'Name must be at least 20 characters long',
            },
          })}
        />
        {errors.firstname && <p>{errors.firstname.message}</p>}
    </div>
  </form>
  )
}
