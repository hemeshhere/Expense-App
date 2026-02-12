import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { useState } from "react";
import { useEffect } from "react";

const PLAN_IDS={
    UNLIMITED_MONTHLY:{
        planName: 'Unlimited Monthly',
        price: 5,
        frequency: 'monthly'
    },
    UNLIMITED_YEARLY:{
        planName: 'Unlimited Yearly',
        price: 50,
        frequency: 'yearly'
    },
}
function ManageSubscription(){
    const [userProfile, setUserProfile]=useState(null);
    const [errors, setErrors]=useState({});
    const [loading, setloading]=useState(true);

    const getUserProfile= async ()=>{
        try{
            const response= await axios.get(
                `${serverEndpoint}/users/get-user-info`,
                {withCredentials: true}
            );
            setUserProfile(response.data.user);
        }   
        catch(error){
            console.log(error);
            setErrors({message: 'Unable to fetch subscription data'});
        }
        finally{
            setloading(false);
        }
    }
    useEffect(()=>{
        getUserProfile();
    },[]);

    

    if(loading){
        return (
            <div className='container p-5 text-center'>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container p-5">
            {errors.message && (
                <div className='alert alert-danger' role='alert'>
                    {errors.message}
                </div>
            )}
            {message && (
                <div className='alert alert-success' role='alert'>
                    {message}
                </div>
            )}
            {userProfile?.subscription?.status === undefined && (
                <>
                    {Object.keys(PLAN_IDS).map(key=>(
                        <div className="col-auto border m-2 p2" key={key}>
                            <h4>{PLAN_IDS[key].planName}</h4>
                            <p>Pay INR {PLAN_IDS[key].price} {PLAN_IDS[key].frequency}</p>
                            <button className="btn btn-outline-primary" onClick={()=> {  }}>
                                Subscribe
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
};
export default ManageSubscription;
