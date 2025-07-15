import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react';

interface Formula {
  name: string;
  formula: string;
  calculate: (params: Record<string, number>) => number;
  parameters: Array<{
    name: string;
    symbol: string;
    unit: string;
  }>;
  description: string;
}

const formulas: Formula[] = [
  {
    name: "Kinetic Energy",
    formula: "KE = ½mv²",
    calculate: (params) => {
      if (typeof params.m !== 'number' || typeof params.v !== 'number') {
        throw new Error('Invalid parameters');
      }
      return 0.5 * params.m * Math.pow(params.v, 2);
    },
    parameters: [
      { name: "Mass", symbol: "m", unit: "kg" },
      { name: "Velocity", symbol: "v", unit: "m/s" }
    ],
    description: "Calculate the kinetic energy of a moving object"
  },
  {
    name: "Gravitational Force",
    formula: "F = G(m₁m₂)/r²",
    calculate: (params) => {
      if (typeof params.mass1 !== 'number' || typeof params.mass2 !== 'number' || typeof params.distance !== 'number') {
        throw new Error('Invalid parameters');
      }
      const G = 6.67430e-11;
      if (params.distance === 0) throw new Error('Distance cannot be zero');
      return (G * params.mass1 * params.mass2) / Math.pow(params.distance, 2);
    },
    parameters: [
      { name: "Mass 1", symbol: "mass1", unit: "kg" },
      { name: "Mass 2", symbol: "mass2", unit: "kg" },
      { name: "Distance", symbol: "distance", unit: "m" }
    ],
    description: "Calculate the gravitational force between two objects"
  },
  {
    name: "Wave Frequency",
    formula: "f = v/λ",
    calculate: (params) => {
      if (typeof params.velocity !== 'number' || typeof params.wavelength !== 'number') {
        throw new Error('Invalid parameters');
      }
      if (params.wavelength === 0) throw new Error('Wavelength cannot be zero');
      return params.velocity / params.wavelength;
    },
    parameters: [
      { name: "Wave Speed", symbol: "velocity", unit: "m/s" },
      { name: "Wavelength", symbol: "wavelength", unit: "m" }
    ],
    description: "Calculate the frequency of a wave"
  },
  {
    name: "Electrical Power",
    formula: "P = VI",
    calculate: (params) => {
      if (typeof params.voltage !== 'number' || typeof params.current !== 'number') {
        throw new Error('Invalid parameters');
      }
      return params.voltage * params.current;
    },
    parameters: [
      { name: "Voltage", symbol: "voltage", unit: "V" },
      { name: "Current", symbol: "current", unit: "A" }
    ],
    description: "Calculate electrical power"
  },
  {
    name: "Momentum",
    formula: "p = mv",
    calculate: (params) => {
      if (typeof params.mass !== 'number' || typeof params.velocity !== 'number') {
        throw new Error('Invalid parameters');
      }
      return params.mass * params.velocity;
    },
    parameters: [
      { name: "Mass", symbol: "mass", unit: "kg" },
      { name: "Velocity", symbol: "velocity", unit: "m/s" }
    ],
    description: "Calculate linear momentum"
  }
];

export default function PhysicsCalculator() {
  const [selectedFormula, setSelectedFormula] = useState<Formula>(formulas[0]);
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showScientific, setShowScientific] = useState(true);

  const validateInputs = (params: Record<string, number>): boolean => {
    for (const param of selectedFormula.parameters) {
      const value = params[param.symbol];
      if (value === undefined || isNaN(value)) {
        setError(`Please enter a valid number for ${param.name}`);
        return false;
      }
      if (param.symbol.includes('distance') && value <= 0) {
        setError("Distance must be greater than zero");
        return false;
      }
      if (param.symbol.includes('wavelength') && value <= 0) {
        setError("Wavelength must be greater than zero");
        return false;
      }
      if ((param.symbol === 'm' || param.symbol === 'mass' || param.symbol === 'mass1' || param.symbol === 'mass2') && value < 0) {
        setError("Mass cannot be negative");
        return false;
      }
    }
    return true;
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    if (!validateInputs(parameters)) {
      return;
    }

    try {
      const calculatedResult = selectedFormula.calculate(parameters);
      
      if (!isFinite(calculatedResult)) {
        setError("Calculation resulted in an invalid value. Please check your inputs.");
        return;
      }

      setResult(calculatedResult);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An error occurred during calculation. Please check your inputs.");
      }
    }
  };

  const handleInputChange = (symbol: string, value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    setParameters(prev => ({
      ...prev,
      [symbol]: numValue
    }));
    setError(null);
    setResult(null);
  };

  const getUnitForResult = (formulaName: string): string => {
    switch (formulaName) {
      case "Kinetic Energy":
        return "J";
      case "Gravitational Force":
        return "N";
      case "Wave Frequency":
        return "Hz";
      case "Electrical Power":
        return "W";
      case "Momentum":
        return "kg⋅m/s";
      default:
        return "";
    }
  };

  const formatResult = (value: number): string => {
    if (showScientific) {
      return value.toExponential(4);
    }
    // For numbers larger than 1000 or smaller than 0.01, use toLocaleString
    if (value >= 1000 || value < 0.01) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    // For other numbers, show up to 4 decimal places
    return value.toFixed(4);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <CalcIcon className="text-blue-400 w-6 h-6" />
        <h3 className="text-2xl font-bold">Physics Formula Calculator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Formula</label>
          <select
            className="w-full bg-gray-700 rounded-lg p-3 text-white"
            onChange={(e) => {
              setSelectedFormula(formulas[Number(e.target.value)]);
              setParameters({});
              setResult(null);
              setError(null);
            }}
          >
            {formulas.map((f, index) => (
              <option key={f.name} value={index}>{f.name}</option>
            ))}
          </select>

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Formula:</h4>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-xl font-mono">{selectedFormula.formula}</p>
            </div>
            <p className="text-gray-400 mt-2">{selectedFormula.description}</p>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            {selectedFormula.parameters.map((param) => (
              <div key={param.symbol}>
                <label className="block text-sm font-medium mb-2">
                  {param.name} ({param.symbol}) [{param.unit}]
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded-lg p-3 text-white"
                  placeholder={`Enter ${param.name.toLowerCase()}`}
                  value={parameters[param.symbol] || ''}
                  onChange={(e) => handleInputChange(param.symbol, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            Calculate
            <ArrowRight className="w-4 h-4" />
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
              {error}
            </div>
          )}

          {result !== null && !error && (
            <div className="mt-6 bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Result:</h4>
                <button
                  onClick={() => setShowScientific(!showScientific)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Show {showScientific ? 'Standard' : 'Scientific'} Notation
                </button>
              </div>
              <p className="text-2xl font-mono text-blue-400">
                {formatResult(result)} {getUnitForResult(selectedFormula.name)}
              </p>
              {showScientific && (
                <p className="text-sm text-gray-400 mt-2">
                  Standard: {result.toLocaleString()} {getUnitForResult(selectedFormula.name)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}