// File: pages/mes-documents.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import DocumentSection from '@/components/DocumentSection';
import { documents } from '@/data/documents';

const MesDocuments: NextPage = () => (
  <>
    <Head>
      <title>Mes Documents | Campus Onboarding</title>
      <meta name="description" content="Gestion de vos documents étudiants" />
    </Head>
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Documents</h1>
        <DocumentSection title="Documents à signer" docs={documents.toSign} />
        <DocumentSection title="Documents généraux" docs={documents.general} />
        <DocumentSection title="Ressources" docs={documents.resources} />
      </div>
    </main>
  </>
);

export default MesDocuments;