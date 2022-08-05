import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React, { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import axios from '../lib/axios';

interface stateProps {
  name: string;
  email: string;
  username: string;
}

interface profileProps {
  headline: string;
  bio: string;
  website: string;
  location: string;
}

interface propTypes {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    image: string;
    Profile: profileProps;
  };
}

const settings = ({ user }: propTypes) => {
  const [formValues, setFormValues] = useState<stateProps>({
    name: user.name || '',
    email: user.email || '',
    username: user.username || '',
  });

  const [profileValues, setProfileValues] = useState({
    headline: user.Profile?.headline || '',
    bio: user.Profile?.bio || '',
    website: user.Profile?.website || '',
    location: user.Profile?.location || '',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onProfileChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setProfileValues({ ...profileValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/update/${user.id}`, {
        userValues: formValues,
        profileValues,
      });
      alert(res.data.message);
    } catch (err: any) {
      alert(err?.response?.data.message);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="bg-white rounded-md border-2 border-gray-100 px-3 py-2 max-w-[90%] m-auto">
        <form className="flex flex-col pt-5 space-y-4" onSubmit={onSubmit}>
          <h2 className="font-bold text-xl">User</h2>
          <div className="space-y-1">
            <label htmlFor="email" className="text-slate-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={onChange}
              placeholder="Tousif Ahmed"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-slate-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={onChange}
              placeholder="example@domain.com"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="username" className="text-slate-500">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={onChange}
              placeholder="tousifprovat"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              required
            />
          </div>
          <h2 className="font-bold text-xl">Profile</h2>
          <div className="space-y-1">
            <label htmlFor="headline" className="text-slate-500">
              Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={profileValues.headline}
              onChange={onProfileChange}
              placeholder="Full Stack Developer @company"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="bio" className="text-slate-500">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileValues.bio}
              onChange={onProfileChange}
              placeholder="Write your bio in few words"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="website" className="text-slate-500">
              Website
            </label>
            <input
              type="link"
              id="website"
              name="website"
              value={profileValues.website}
              onChange={onProfileChange}
              placeholder="https://example.com"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="location" className="text-slate-500">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profileValues.location}
              onChange={onProfileChange}
              placeholder="where do you live?"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="text-center">
            <button className="bg-blue-500 w-full py-2 rounded-md text-white hover:bg-blue-600">
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const res = await fetch(
    `http://localhost:3000/api/user/${session?.user?.username}`
  );
  const data = await res.json();
  return {
    props: {
      user: data.user,
    },
  };
};

export default settings;