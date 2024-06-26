
import { Input } from '@components/ui/input';
import MainLayout from '@pages/layout/main-layout';
import { useEffect, useMemo, useState } from 'react';
import ProtectedRoute from 'src/middleware/protected-route';
import FilterList from './filter-list';
import CustomCollapsible from '@components/collapsible/custom-collapsible';
import { categories, dummyCharity } from '@lib/types/charity-types';
import { Toggle } from '@components/ui/toggle';
import {CharityCard, CharityCardSkeleton} from '@components/charity/charity-card';
import { useService } from '@lib/hooks/useService';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { FaSearch } from 'react-icons/fa';
import countryList from 'react-select-country-list';
import { Separator } from '@components/ui/separator';
import Magnify from '@components/icons/magnify';

const ExplorePage = () => {


  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const {getCharityService} = useService();
  const [charities, setCharities] = useState<BackendCharityEvent[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [activeLocation, setActiveLocation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), [])

  const toggleCategory = (category: string) => {
    console.log(activeCategories)
    setActiveCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {

        return [...prevCategories, category];
      }
    });
  };


  const toggleLocation = (location: string) => {
    setActiveLocation((prevLocations) => {
      if (prevLocations.includes(location)) {
        return prevLocations.filter((c) => c !== location);
      } else {
        return [...prevLocations, location];
      }
    });
  }
  
  const getAllCharities = async () => {
    const charityService = await getCharityService();
    let searchParams = (params.get('search') !== '' ? [params.get('search')] : []);
    let categoryParams = activeCategories.length <= 0 ? [] : [activeCategories];
    let locationParams = activeLocation.length <= 0 ? [] : [activeLocation];
    //@ts-ignore assuuuuu
    return await charityService.getAllCharities(searchParams, categoryParams, locationParams);
  }

  const getAllLocations = async () => {
    const charityService = await getCharityService();
    return await charityService.getAllCharityLocations();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCharities();
        const locations = await getAllLocations();
        setLoading(true);
        // console.log(response)
        // console.log(locations)
        console.log("loading")
        //@ts-ignore
        setCharities([...response.ok]);
        //@ts-ignore
        setLocationFilters([...locations.ok ]);

      } catch (error) {
        console.log("Error fetching charities", error);
        setCharities([]);
      } finally{
        console.log("dah loading")
        setLoading(false);
      };
    };
    fetchData();
  }, [params, activeCategories, activeLocation]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParams({ search: search });
  }

  const removeAllCategories = () => {
    setActiveCategories([]);
  }

  const removeAllLocations = () => {
    setActiveLocation([]);
  }

  return (
    <ProtectedRoute>
      <MainLayout className='bg-slate-100'>
        <div className="p-24 min-h-[80vh]  justify-center flex gap-8 flex-col pt-36">
          <div className="text-3xl font-medium">Explore</div>
          <form className="flex items-center gap-4 divide-x-2 w-full" onSubmit={handleSearchSubmit}>
            <Input
              onChange={handleSearchChange}
              className="basis-1/4 bg-white file:bg-white"
              placeholder="Charity Event"
              value={search}
            />
            <div className="pl-3 basis-3/4 items-center justify-between flex ">
              <Button  className=' rounded-full flex items-center gap-2 px-6'>
                <Magnify/>
                Search
              </Button>
              <div className='flex gap-2 flex-wrap flex-shrink-0'>
                <FilterList
                  handleClearFilter={removeAllCategories}
                  filterName="Category"
                  tags={activeCategories}
                />
                <FilterList
                  handleClearFilter={removeAllLocations}
                  filterName="Location"
                  tags={activeLocation}
                />
              </div>
            </div>
          </form>
          <div className="w-full gap-8 flex ">
            <div className="flex flex-col basis-1/4">
              <div className="flex flex-col gap-8">
                <CustomCollapsible title="Category" status={true} count={categories.length}>
                  <div className="p-2 flex flex-col gap-2">
                    {categories.map((category, index) => {
                      return (
                        <Toggle className={`font-normal text-base ${activeCategories.includes(category) ? 'bg-blue-200' : ''}`} onClick={() => toggleCategory(category)} key={index} >{category}</Toggle>
                      );
                    })}
                  </div>
                </CustomCollapsible>
                <CustomCollapsible title="Location" count={locationFilters.length}>
                  <div className="p-2 flex flex-col gap-2">
                    {/* Diisi dari charity yang available ada di Location apa aja */}
                    {locationFilters.map((location, index) => {
                      return (
                        <Toggle className={`font-normal text-base ${activeLocation.includes(location) ? 'bg-blue-200' : ''}`} onClick={() => toggleLocation(location)} key={index} >{location}</Toggle>
                      );
                    })}
                  </div>
                </CustomCollapsible>
              </div>
            </div>
            <div className="flex flex-col basis-3/4">
              <div className="w-full grid gap-8 grid-cols-3">
                {
                  (loading || !charities) && (
                    <>
                      <CharityCardSkeleton/>
                      <CharityCardSkeleton/>
                      <CharityCardSkeleton/>
                    </>
                  )
                }

                {
                  charities.length > 0 && charities.map((charity,index) => (
                    <CharityCard charity={charity} key={index}/>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default ExplorePage;
