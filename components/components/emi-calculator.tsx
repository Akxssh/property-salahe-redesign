"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EMICalculatorProps {
  defaultPrice?: number;
}

export function EMICalculator({ defaultPrice = 5000000 }: EMICalculatorProps) {
  const [principal, setPrincipal] = useState(defaultPrice);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyInterest = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi =
    (principal * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
    (Math.pow(1 + monthlyInterest, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(2)} L`;
    }
    return `₹ ${value.toLocaleString("en-IN")}`;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">EMI Calculator</h3>
          <Badge variant="secondary" className="bg-blue-200 text-blue-800">
            Tool
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Loan Amount */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-medium">{formatCurrency(principal)}</span>
          </div>
          <Slider
            value={[principal]}
            min={1000000}
            max={10000000}
            step={100000}
            onValueChange={([value]) => setPrincipal(value)}
            className="w-full"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-medium">{interestRate}%</span>
          </div>
          <Slider
            value={[interestRate]}
            min={6.5}
            max={12}
            step={0.1}
            onValueChange={([value]) => setInterestRate(value)}
            className="w-full"
          />
        </div>

        {/* Tenure */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tenure (Years)</span>
            <span className="font-medium">{tenure} Years</span>
          </div>
          <Slider
            value={[tenure]}
            min={5}
            max={30}
            step={1}
            onValueChange={([value]) => setTenure(value)}
            className="w-full"
          />
        </div>

        {/* EMI Result */}
        <div className="pt-4 border-t border-blue-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Your Monthly EMI</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(Math.round(emi))}
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/50 rounded p-2 text-center">
            <p className="text-gray-500">Principal</p>
            <p className="font-semibold">{formatCurrency(principal)}</p>
          </div>
          <div className="bg-white/50 rounded p-2 text-center">
            <p className="text-gray-500">Interest</p>
            <p className="font-semibold">{formatCurrency(Math.round(totalInterest))}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
