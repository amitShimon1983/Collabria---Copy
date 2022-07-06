import { useReactiveVar, appContextVar } from '@harmon.ie/collabria-frontend-shared';
import { Spinner } from '@harmon.ie/collabria-frontend-storybook';
import React, { useState, useCallback, lazy, Suspense, FunctionComponent } from 'react';
const EditPage = lazy(() => import('../EditPage'));
const MainPage = lazy(() => import('../MainPage'));

interface SharedPageProps {}

const SharePage: FunctionComponent<SharedPageProps> = () => {
  const [selectedMail, setSelectedMail] = useState<{ [key: string]: any } | null>(null);
  const { user } = useReactiveVar(appContextVar);
  const onBack = useCallback(() => setSelectedMail(null), []);

  return (
    <div className="App">
      <>
        <Suspense fallback={<Spinner label={'Loading...'} />}>
          {user && <MainPage onSelectMail={setSelectedMail} selectedMail={selectedMail} />}
        </Suspense>
        <Suspense fallback={<></>}>
          <EditPage selectedMail={selectedMail} onBack={onBack} />
        </Suspense>
      </>
    </div>
  );
};

export default SharePage;
