"use client";

import { useState, useEffect } from "react";
import { CircleUserRound, Phone, TrendingUp, Building, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EMICalculator } from "./emi-calculator";
import { motion } from "framer-motion";

interface SidebarProps {
  isLoggedIn?: boolean;
}

const marketStats = [
  { label: "Properties Listed", value: "2.5L+", icon: Building },
  { label: "Active Dealers", value: "15K+", icon: Users },
  { label: "Avg. Price Growth", value: "+12%", icon: TrendingUp, trend: "up" },
];

export function Sidebar({ isLoggedIn = false }: SidebarProps) {
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  return (
    <div className="space-y-4">
      {/* Guest/User Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100">
                  <CircleUserRound className="w-6 h-6 text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold block">
                  {isLoggedInState ? "Welcome Back!" : "Guest User"}
                </span>
                <span className="text-xs text-gray-500">
                  {isLoggedInState ? "Logged in" : "Not logged in"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!isLoggedInState ? (
              <>
                <h4 className="text-sm font-medium mb-2">Your Recent Activity</h4>
                <p className="text-sm text-gray-600 mb-4">
                  No activity yet! Start browsing properties and track them from
                  here.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsLoggedInState(true)}
                >
                  LOGIN / REGISTER
                </Button>
                <p className="text-xs text-center text-gray-400 mt-2">
                  to access all the features on Property Salahe
                </p>
              </>
            ) : (
              <>
                <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📋 Saved Properties
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    👁️ Recent Views
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    💬 Enquiries
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* EMI Calculator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <EMICalculator />
      </motion.div>

      {/* Promotional Banner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6 relative overflow-hidden min-h-[180px]">
            <div className="relative z-10 max-w-[70%]">
              <Badge className="bg-green-500 mb-2">Featured</Badge>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Sell or rent faster
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                at the right price with our experts!
              </p>
              <Button className="bg-green-600 hover:bg-green-700 w-full text-sm py-2 h-auto">
                <Phone className="w-4 h-4 mr-2" />
                Get Free Consultation
              </Button>
            </div>
            <Image
              src="https://loremflickr.com/150/150/person,professional?lock=100"
              alt="Agent"
              width={90}
              height={90}
              className="absolute bottom-2 right-2 rounded-full border-4 border-white shadow-lg"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Market Insights
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{stat.value}</span>
                  {stat.trend === "up" && (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Download App Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <h3 className="font-bold text-gray-900 mb-2">
              Download Our App
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Get the best property experience on your phone
            </p>
            <div className="flex gap-2 justify-center">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                📱 Play Store
              </Button>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                🍎 App Store
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
