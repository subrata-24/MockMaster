import axios from "axios";
import React from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useEffect } from "react";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/get-current-user`,
          {
            withCredentials: true,
          }
        );
        console.log(result.data);
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(`Find error when trying to get the current user ${error}`);
      }
    };
    fetchUser();
  }, []);
};

export default useGetCurrentUser;
