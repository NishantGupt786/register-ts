import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState<string>("");
  const userSchema = z
    .object({
      firstName: z
        .string({
          required_error: "Required",
          invalid_type_error: "First name must be a string",
        })
        .min(2, "First name must have min 2 chars")
        .max(20, "First name must have max 20 chars"),
      lastName: z
        .string({
          required_error: "Required",
          invalid_type_error: "Last name must be a string",
        })
        .max(20, "Last name must have max 20 chars"),
      email: z
        .string({
          required_error: "Required",
          invalid_type_error: "Email must be a string",
        })
        .email("Enter a valid email"),
      password: z
        .string({
          required_error: "Required",
          invalid_type_error: "Password must be a string",
        })
        .regex(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        ),
      confirmPassword: z.string({
        required_error: "Required",
        invalid_type_error: "Confirm password must be a string",
      }),
      country: z.string({
        required_error: "Required",
        invalid_type_error: "Country must be a string",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: country,
    },
    validationSchema: toFormikValidationSchema(userSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const send = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        coutry: values.country,
      };
      console.log(send);
    },
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;
  return (
    <main className="mx-10">
      <form onSubmit={handleSubmit}>
        <div className="pt-1">
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-white"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6 
                      ${
                        touched.firstName && errors.firstName
                          ? "ring-2 ring-inset ring-red-500"
                          : ""
                      }`}
                />

                <span className="text-sm text-red-500">
                  {touched.firstName && errors.firstName}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6
                      ${
                        touched.lastName && errors.lastName
                          ? "ring-2 ring-inset ring-red-500"
                          : ""
                      }`}
                />
                <span className="text-sm text-red-500">
                  {touched.lastName && errors.lastName}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6
                      ${
                        touched.email && errors.email
                          ? "ring-2 ring-inset ring-red-500"
                          : ""
                      }`}
                />
                <span className="text-sm text-red-500">
                  {touched.email && errors.email}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6 ${
                    touched.password && errors.password
                      ? "ring-2 ring-inset ring-red-500"
                      : ""
                  } `}
                />
                <span className="text-sm text-red-500">
                  {touched.password && errors.password}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-white"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm Password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-4 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6
                      ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "ring-2 ring-inset ring-red-500"
                          : ""
                      }`}
                />
                <span className="text-sm text-red-500">
                  {touched.confirmPassword && errors.confirmPassword}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-white"
              >
                Country
              </label>
              <div className="">
                <ReactFlagsSelect
                  selected={country}
                  onSelect={(countryCode) => {
                    setCountry(countryCode);
                    formik.handleChange("country")(countryCode);
                  }}
                  placeholder="Select Country"
                  searchable
                  searchPlaceholder="Search countries"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#37ABBC] sm:text-sm sm:leading-6
                      ${
                        touched.country && errors.country
                          ? "ring-2 ring-inset ring-red-500"
                          : ""
                      }`}
                />

                <span className="text-sm text-red-500">
                  {touched.country && errors.country}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md text-base bg-[#37ABBC] text-white hover:bg-[#288391] px-2 py-2 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37ABBC]"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
