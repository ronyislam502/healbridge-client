'use client';

import { useEffect, useState } from 'react';
import { Icons } from '@/components/shared/Icons';
import { Pagination } from '@/components/shared/Pagination';
import { useGetAllDoctorsQuery } from '@/redux/features/doctor/doctorApi';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import DoctorCard from './DoctorCard';
import DoctorFilters from './components/DoctorFilters';
import { TDoctor } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/components/utilities/Debaounce';

const DoctorListing = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const specialtiesFromQuery = searchParams.get("specialties") || "";

  // ==== States ====
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(specialtiesFromQuery);
  const [search, setSearch] = useState<string>("");
  const [limit] = useState(9);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);


  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (specialtiesFromQuery) {
      setSelectedSpecialty(specialtiesFromQuery);
    }
  }, [specialtiesFromQuery]);

  const { data: doctorsData, isLoading } = useGetAllDoctorsQuery({
    search: debouncedSearch,
    specialty: selectedSpecialty,
    sort,
    page,
    limit
  });

  const { data: specialtiesData } = useGetAllSpecialtiesQuery({});


  // ==== Derived Data ====
  const doctors = doctorsData?.data || [];
  const meta = doctorsData?.meta;

  const specialtiesOptions = [
    { key: 'all', label: 'All Specialties' },
    ...(specialtiesData?.data?.map((s: any) => ({ key: s.title, label: s.title })) || [])
  ];


  // ==== Handlers ====
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setSearch("");
    setSelectedSpecialty("");
    setSort("");
    setPage(1);
    setResetKey(prev => prev + 1);
    router.replace("/doctors", { scroll: false });
  };

  const handleFilterSubmit = (data: any) => {
    setSearch(data.search || "");
    setSelectedSpecialty(data.specialty === 'all' ? '' : (data.specialty || ''));
    setSort(data.sort || "");
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <DoctorFilters
          key={resetKey}
          specialtiesOptions={specialtiesOptions}
          onFilterSubmit={handleFilterSubmit}
          onReset={handleReset}
        />

        {/* Doctor List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">
              Expert <span className="text-teal-500 underline decoration-teal-500/20 underline-offset-8">Practitioners</span>
              <span className="ml-4 text-xs font-black text-slate-400 not-italic uppercase tracking-[0.2em]">({meta?.total || 0} Found)</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] h-96 animate-pulse border border-slate-100 dark:border-slate-800" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {doctors.map((doctor: TDoctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
                {doctors.length === 0 && (
                  <div className="col-span-full py-32 text-center bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <Icons.activity className="w-16 h-16 text-slate-300 mx-auto mb-6 animate-pulse" />
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] italic">No experts found matching your criteria.</p>
                  </div>
                )}
              </div>

              {meta && meta.total > limit && (
                <div className="mt-16">
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(meta.total / limit)}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { DoctorListing };
