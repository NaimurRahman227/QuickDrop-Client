import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RiderRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post(
                "${import.meta.env.VITE_API_URL}/api/users/register",
                {
                    ...data,
                    role: "rider",   // 👈 VERY IMPORTANT
                }
            );

            alert("Rider account created successfully!");
            navigate("/login");

        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="w-full max-w-md mx-auto lg:ml-20">

                {/* TOP TEXT */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Create Rider Account</h1>
                    <p className="py-3 text-gray-500">
                        Join QuickDrop as a delivery partner.
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="space-y-3">

                                {/* NAME */}
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}

                                {/* EMAIL */}
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                                {/* NID Card NUMBER */}
                                <label>NID Card Number</label>
                                <input
                                    type="text"
                                    placeholder="National Identity Number"
                                    className="input input-bordered w-full"
                                    {...register("NIDCardNumber", { required: "NID Card number is required" })}
                                />
                                {errors.NIDCardNumber && (
                                    <p className="text-red-500 text-sm">{errors.NIDCardNumber.message}</p>
                                )}

                                {/* PHONE */}
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full"
                                    {...register("phone", { required: "Phone number is required" })}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}

                                {/* VEHICLE TYPE */}
                                <label>Vehicle Type</label>
                                <select
                                    className="select select-bordered w-full"
                                    {...register("vehicleType", { required: "Vehicle type is required" })}
                                >
                                    <option value="">Select Vehicle</option>
                                    <option value="bike">Bike</option>
                                    <option value="cycle">Cycle</option>
                                    <option value="car">Car</option>
                                </select>
                                {errors.vehicleType && (
                                    <p className="text-red-500 text-sm">{errors.vehicleType.message}</p>
                                )}

                                {/* VEHICLE NUMBER */}
                                <label>Vehicle Number</label>
                                <input
                                    type="text"
                                    placeholder="Vehicle Registration Number"
                                    className="input input-bordered w-full"
                                    {...register("vehicleNumber", { required: "Vehicle number is required" })}
                                />
                                {errors.vehicleNumber && (
                                    <p className="text-red-500 text-sm">{errors.vehicleNumber.message}</p>
                                )}

                                {/* PASSWORD */}
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    {...register("password", {
                                        required: "Password required",
                                        minLength: 6,
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        Password must be at least 6 characters
                                    </p>
                                )}

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-3"
                                >
                                    Register as Rider
                                </button>

                                {/* LOGIN LINK */}
                                <p className="text-center text-sm mt-2">
                                    Already have an account?{" "}
                                    <Link to='/Login' className="text-primary font-medium hover:underline">
                                        Login
                                    </Link>
                                </p>

                            </fieldset>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RiderRegister;