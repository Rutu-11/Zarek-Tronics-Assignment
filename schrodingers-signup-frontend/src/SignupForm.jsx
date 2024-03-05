import  { useState, useEffect } from 'react';
import axios from 'axios';
// import io from 'socket.io-client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./SignupForm.css";

const SignupForm = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineFormData, setOfflineFormData] = useState(null);
console.log('isOnline',isOnline)
 

async function appendOfflineDataToCloud(user){
    try{
        await axios.post('https://schrodingers-signup-backend.vercel.app/api/user/signup', user);
    }
catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
    
}


useEffect(() => {
    const data = JSON.parse(localStorage.getItem('offlineFormData')) || [];
    if (data && data.length > 0) {
        data.forEach((user) => {
            appendOfflineDataToCloud(user);
        });

        // Remove all processed user data from the array
        localStorage.setItem('offlineFormData', JSON.stringify([]));
    }
}, [isOnline]);





useEffect(() => {

    const checkOnlineStatus = () => {
        const onlineStatus = navigator.onLine;
        setIsOnline(onlineStatus);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    // Check connection status on initial load
    const initialConnectionStatus = navigator.onLine;
    setIsOnline(initialConnectionStatus);

    return () => {
        window.removeEventListener('online', checkOnlineStatus);
        window.removeEventListener('offline', checkOnlineStatus);
    };
}, [offlineFormData]);




  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      class:'',
      session:''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
        course: Yup.string(),
      session: Yup.string()

    }),
    onSubmit: async (values) => {
      try {
        if (isOnline) {
          await axios.post('https://schrodingers-signup-backend.vercel.app/api/user/signup', values);
          alert('User registered successfully');
          formik.resetForm();
        } else {
            const data = JSON.parse(localStorage.getItem('offlineFormData')) || [];
            data.push(values)
          localStorage.setItem('offlineFormData', JSON.stringify(data));
          setOfflineFormData(values);
          alert('User registered offline. Data will be submitted once online.');
          formik.resetForm();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  });

  return (
    <div className="signup-form"> 
   <p style={{'textAlign':'center'}}>
  {isOnline ? (
    <span style={{ color: 'green' }}>&#8226; Online</span>
  ) : (
    <span style={{ color: 'red' }}>&#8226; Offline</span>
  )}
</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
          </div>
          <div className="form-group" style={{ display: isOnline ? 'block' : 'none' }}>
            <label>Course:</label>
            <input type="text" name="course" value={formik.values.course} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.course && formik.errors.course ? <div className="error">{formik.errors.course}</div> : null}
          </div>
          
          <div className="form-group" style={{ display: isOnline ? 'block' : 'none' }}>
            <label>Session:</label>
            <input type="text" name="session" value={formik.values.session} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.session && formik.errors.session ? <div className="error">{formik.errors.session}</div> : null}
          </div>
          <button type="submit" style={{backgroundColor:'green', color:'#fff'}} >Sign Up</button>
        </form>
    </div>
  );
};

export default SignupForm;
