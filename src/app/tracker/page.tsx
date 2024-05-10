import React from 'react';
import TrackerList from "@/components/tracker/TrackerList";
import CreateTrackerForm from "@/components/tracker/CreateTrackerForm";


const Page = async () => {
  return (
    <section>
      <CreateTrackerForm />
      <TrackerList />
    </section>
  );
};

export default Page;