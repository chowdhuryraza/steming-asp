import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from "../api"


const Resource = () => {
    const [category, setCategory] = useState("")
    const [resources, setResources] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams()
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)

    const handleChange = (event) => {
        setCategory(event.target.value)
        setPage(1)
    }

    const handleNext = (event) => {
        setPage(page + 1)
    }

    const handlePrev = (event) => {
        setPage(page - 1)
    }

    function getResources(option, pageNum) {
      api.get(option == "" ? `/api/resources/?page=${pageNum}` : `/api/resources/?category=${option}&page=${pageNum}`)
        .then((res) => res.data)
        .then((data) => {
          setPrev(data.previous)
          setNext(data.next)
          setResources(data.results)
          setLoading(false);
          setError(null)
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    
    useEffect(() => {
      getResources(category, 1);
    }, []);

    useEffect(() => {
      setParams(`?${new URLSearchParams({category: category, page: page})}`)
      getResources(category, page)
    }, [category, page])

    if(loading){
      return <p className="bg-[#008000] text-white p-[140px] h-screen text-center">Loading...</p>
    }
    if(error){
      return <p className="bg-[#008000] text-white p-[140px] h-screen text-center">Error Loading Resources: {error.message || 'Unknown Error'}</p>
    }

    return (
        <div className='bg-[#008000] pt-[120px] lg:pt-[150px] min-h-screen'>
            <div className='flex flex-col items-center'>
                <h1 className=" text-[#ffff00] font-bold text-2xl underline">
                    Free Resources
                </h1>
                <p className='text-white text-base pt-3 pb-5 max-w-[200px] ml-4 md:ml-0 md:max-w-screen-lg'>
                    Check out the inventory of free, enriching opportunities we have gathered for you!
                </p>
            </div>
            <hr/>
            <div className='p-5 bg-[#126e12] max-w-fit m-3 rounded-md'>
            <label for="category" className='text-white'>Category:</label>
            <select name="category" id="category" className='ml-2' onChange={handleChange}>
                <option value="">All</option>
                <option value="nonprofits">Nonprofits</option>
                <option value="onlinecourses">Online Courses</option>
                <option value="studentorganizations">Student Organizations</option>
            </select>

            </div>
            <div className='p-8 flex flex-col items-center' >
                {resources.length > 0 ? (
                resources.map((resource) => (
                    <ResourceCard
                        name={resource.name}
                        link={resource.link}
                        imgSrc={resource.profile_img_link}
                        description={resource.description} 
                    />
                ))
                ) : (
                <p className='text-white pt-4'>
                    Our database doesn't contain any resources in this category yet.
                    Please check back soon! 
                </p>
                )}
            </div>
            {resources.length > 0 ?
             <Pagination 
             prevPage={prev} 
             nextPage={next}
             onPrev={handlePrev}
             onNext={handleNext}
             pageNum={page}
             /> : 
            null}
        </div>

    )
}

export default Resource

const ResourceCard = ({ name, link, imgSrc, description }) => {
    return (
      <>
        <a href={link} class="mt-5 flex flex-col items-center bg-[#0f5f0f] border-yellow border-2 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-[#126e12]"
                    target="_blank" 
                    rel="noopener noreferrer">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={imgSrc} alt=""/>
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
                <p class="mb-3 font-normal text-[#fefbf1]">{description}</p>
            </div>
        </a>
      </>
    );
};


const Pagination = ({prevPage, nextPage, onPrev, onNext, pageNum}) => {
    return (
        <div className="bg-[#008000] py-10 text-center">
          <div>
            <ul className="mx-auto flex w-full max-w-[415px] items-center justify-between">
              <li>
                <button 
                    className={prevPage ? "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-white/5" : "hidden h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-white/5"}
                    onClick={onPrev}
                >
                  <span>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.325 14.825C11.175 14.825 11.025 14.775 10.925 14.65L5.27495 8.90002C5.04995 8.67502 5.04995 8.32503 5.27495 8.10002L10.925 2.35002C11.15 2.12502 11.5 2.12502 11.725 2.35002C11.95 2.57502 11.95 2.92502 11.725 3.15002L6.47495 8.50003L11.75 13.85C11.975 14.075 11.975 14.425 11.75 14.65C11.6 14.75 11.475 14.825 11.325 14.825Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="max-sm:hidden"> Previous </span>
                </button>
              </li>
              <p className="text-base font-medium text-white">
                Page {pageNum}
              </p>
              <li>
                <button 
                    className={nextPage ? "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-white/5" : "hidden h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-white/5"}
                    onClick={onNext}
                >
                  <span className="max-sm:hidden"> Next </span>
                  <span>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.67495 14.825C5.52495 14.825 5.39995 14.775 5.27495 14.675C5.04995 14.45 5.04995 14.1 5.27495 13.875L10.525 8.50003L5.27495 3.15002C5.04995 2.92502 5.04995 2.57502 5.27495 2.35002C5.49995 2.12502 5.84995 2.12502 6.07495 2.35002L11.725 8.10002C11.95 8.32503 11.95 8.67502 11.725 8.90002L6.07495 14.65C5.97495 14.75 5.82495 14.825 5.67495 14.825Z"
                        fill="currentCOlor"
                      />
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      );
}