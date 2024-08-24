import React from 'react'
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

const Profile = () => {
  const token = localStorage.getItem(ACCESS_TOKEN)

  const data = jwtDecode(token)


  return (
    <div className='min-h-screen bg-[#008000] flex items-center justify-center'>
      <div class="bg-[#126e12] overflow-hidden shadow rounded-lg border mt-[120px] mb-[30px] border-yellow max-w-[70%]">
          <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-[#ffff00]">
                  User Profile
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-white">
                  This is the information we have about you.
              </p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-[#ffff00]">
                          Full Name
                      </dt>
                      <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                          {`${data.first_name} ${data.last_name}`}
                      </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-[#ffff00]">
                          Username
                      </dt>
                      <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                          {data.username}
                      </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-[#ffff00]">
                          Email Address
                      </dt>
                      <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                          {data.email}
                      </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-[#ffff00]">
                          Grade
                      </dt>
                      <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                          {`${data.grade_level}th Grade`}
                      </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-[#ffff00]">
                          School
                      </dt>
                      <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                          {data.school ? data.school : 'School Information Not Provided'}
                      </dd>
                  </div>
              </dl>
          </div>
      </div>
    </div>
  )
}

export default Profile