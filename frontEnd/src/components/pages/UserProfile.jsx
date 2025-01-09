import React, { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useForm } from "react-hook-form";

function UserProfile() {
  const {
    isLoggedIn,
    getUserdata,
    user,
    changeUserAvatar,
    updateUsernameAndEmail,
    updatePassword
  } = useAuth();
  const [editProfile, setEditProfile] = useState({ style: "hidden" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUserdata();
      } catch (error) {
        console.log("error while getting user", error.message);
      }
    };
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  const handleEditProfile = () => {
    setEditProfile({ style: "block" });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    await updatePassword(data), updateUsernameAndEmail(data), changeUserAvatar(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      // alert("Avatar change successfully")
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      {isLoggedIn ? (
        <div className=" p-10 bg-zinc-400">
          <div className="grid grid-cols-3 bg-zinc-600 rounded-xl">
            <div className="flex pt-4 p-2">
              <img
                className="w-32 h-32 rounded-full flex "
                src={user.avatar}
                alt="profile Image"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4  m-2">
              <p className="text-lg text-white font-bold">
                Name: {user.userName}
              </p>
              <p className="text-lg text-white font-bold">
                Email: {user.email}
              </p>
              <p className="text-lg text-white font-bold">
                Address: {user.address}
              </p>
              <p className="text-lg text-white font-bold">
                Mobile: {user.mobile}
              </p>
            </div>
            <div className="p-2 flex flex-col items-end">
              <button
                className=" bg-indigo-900 text-white p-2 rounded-md hover:bg-indigo-600 "
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div>
            <div
              className={`flex flex-col items-center justify-center m-0.5 ${editProfile.style}`}
            >
              <h1 className="bg-indigo-900 text-white text-lg font-bold py-4 w-full rounded-xl">
                Edit Your profile
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-zinc-600 flex flex-col gap-6 px-10 py-5 rounded-lg m-1"
              >
                <input
                  type="text"
                  placeholder="Name"
                  {...register("userName")}
                />
                <input type="text" placeholder="Email" {...register("email")} /> 
                <input type="text" placeholder="OldPassword" {...register("oldPassword")}/>
                <input type="text" placeholder="newPassword" {...register("newPassword")}/>
                <label htmlFor="myfile" className="text-white">Change Image</label>
              <input type="file" name="myfile" 
              {...register("avatar")}
              />
                <input
                  className="bg-indigo-900 text-white p-2 rounded-md hover:bg-indigo-600"
                  type="submit"
                  value="Save"
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="bg-indigo-900 text-white text-lg font-semibold">
          User Not loggedIn
        </p>
      )}
    </div>
  );
}

export default UserProfile;
