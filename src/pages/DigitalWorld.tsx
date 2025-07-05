
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TechHub from '@/components/digitalworld/TechHub';
import GameZone from '@/components/digitalworld/GameZone';

const DigitalWorld = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Digital World</h1>
          <p className="text-base sm:text-lg text-gray-600">Explore, Create, and Play in our Digital Universe</p>
        </div>

        <Tabs defaultValue="techhub" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="techhub" className="text-sm sm:text-lg py-2 sm:py-3">
              🌐 Tech Hub
            </TabsTrigger>
            <TabsTrigger value="gamezone" className="text-sm sm:text-lg py-2 sm:py-3">
              🎮 Game Zone
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="techhub">
            <TechHub />
          </TabsContent>
          
          <TabsContent value="gamezone">
            <GameZone />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DigitalWorld;
