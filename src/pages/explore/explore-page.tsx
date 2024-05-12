import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { Input } from '@components/ui/input';
import MainLayout from '@pages/layout/main-layout';
import { useEffect, useState } from 'react';
import ProtectedRoute from 'src/middleware/protected-route';
import FilterList from './filter-list';
import LineSeparator from '@components/line-separator';
import CustomCollapsible from '@components/collapsible/custom-collapsible';
import { categories, dummyCharity } from '@lib/types/charity-types';
import { Toggle } from '@components/ui/toggle';
import CharityCard from '@pages/home/charity-card';
import { useService } from '@lib/hooks/useService';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';
const ExplorePage = () => {
  const [search, setSearch] = useState<string>('');
  const {getCharityService} = useService();
  const [charities, setCharities] = useState<BackendCharityEvent[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

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
  
  const getAllCharities = async () => {
    const charityService = await getCharityService();
    let searchParams = (search !== '' ? [search] : []);
    let categoryParams = activeCategories.length <= 0 ? [] : [activeCategories];
    //@ts-ignore assuuuuu
    return await charityService.getAllCharities(searchParams, categoryParams);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCharities();
        console.log(response)
        //@ts-ignore assuuuuu
        setCharities([...response.ok]);
      } catch (error) {
        console.log("Error fetching charities", error);
        setCharities([]);
      }
    };
    fetchData();
  }, [search, activeCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <ProtectedRoute>
      <MainLayout className='bg-slate-100'>
        <div className="p-24 min-h-[80vh] justify-center flex gap-6 flex-col">
          <div className="text-4xl font-medium">Explore</div>
          <div className="flex items-center gap-4 divide-x-2">
            <Input
              onChange={handleSearchChange}
              className="w-1/3 bg-white file:bg-white"
              placeholder="Charity Event"
              value={search}
            />
            <div className="pl-4 flex gap-2">
              <FilterList
                handleClearFilter={() => {}}
                filterName="Category"
                tags={['ICP, Bitcoin']}
              />
              <FilterList
                handleClearFilter={() => {}}
                filterName="Location"
                tags={['Indonesia']}
              />
            </div>
          </div>
          <div className="w-full gap-8 flex">
            <div className="flex flex-col basis-1/3">
              <div className="text-2xl font-medium">Filters</div>
              <div className={`h-[1px] bg-gray-200 my-5`}></div>
              <div className="flex flex-col gap-4">
                <CustomCollapsible title="Category" status={true} count={categories.length}>
                  <div className="p-2 flex flex-col gap-2">
                    {categories.map((category, index) => {
                      return (
                        <Toggle className={`font-medium ${activeCategories.includes(category) ? 'bg-blue-200' : ''}`} onClick={() => toggleCategory(category)} key={index} >{category}</Toggle>
                      );
                    })}
                  </div>
                </CustomCollapsible>
                <CustomCollapsible title="Location" count={1}>
                  <div className="p-2 flex flex-col gap-2">
                    {/* Diisi dari charity yang available ada di Location apa aja */}
                    <Toggle className='text-sm'>Indonesia</Toggle>
                  </div>
                </CustomCollapsible>
              </div>
            </div>
            <div className="flex flex-col basis-2/3">
              <div className="w-full grid gap-3 grid-cols-3">
                {/* <CharityCard charity={dummyCharity}/>
                <CharityCard charity={dummyCharity}/>
                <CharityCard charity={dummyCharity}/>
                <CharityCard charity={dummyCharity}/> */}
                {
                  charities.map((charity,index) => (
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
