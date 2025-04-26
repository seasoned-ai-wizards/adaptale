import { useState } from "react";
import {
  Book,
  ChevronRight as ChessKnight,
  ChevronRight,
  Heart,
  Moon,
  Puzzle,
  Shield,
  Sun,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

interface Interest {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

interface TimeSlot {
  hour: number;
  minute: number;
}

export default function SetupScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [interests, setInterests] = useState<Interest[]>([
    {
      id: "books",
      name: "Books & Reading",
      icon: <Book className="h-6 w-6" />,
      selected: false,
    },
    {
      id: "chess",
      name: "Chess",
      icon: <ChessKnight className="h-6 w-6" />,
      selected: false,
    },
    {
      id: "puzzles",
      name: "Puzzles",
      icon: <Puzzle className="h-6 w-6" />,
      selected: false,
    },
  ]);

  const [morningBrief, setMorningBrief] = useState<TimeSlot>({
    hour: 9,
    minute: 0,
  });
  const [afternoonBrief, setAfternoonBrief] = useState<TimeSlot>({
    hour: 15,
    minute: 0,
  });
  const [wellbeingCheck, setWellbeingCheck] = useState<TimeSlot>({
    hour: 11,
    minute: 0,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareWellbeing: true,
    shareMoodUpdates: true,
    shareActivityLogs: false,
    shareEmergencyAlerts: true,
  });

  const toggleInterest = (id: string) => {
    setInterests(
      interests.map((interest) =>
        interest.id === id
          ? { ...interest, selected: !interest.selected }
          : interest,
      ),
    );
  };

  const formatTime = (time: TimeSlot) => {
    return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            AI Companion Setup
          </h1>
          <p className="text-gray-600">
            Customize the perfect digital companion for your loved one
          </p>
        </header>

        <div className="space-y-8">
          {/* Interests Section */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Interests & Activities
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {interests.map((interest) => (
                <Button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  variant={interest.selected ? "default" : "outline"}
                  className="h-auto w-full px-6 py-4"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={
                        interest.selected
                          ? "text-primary-foreground"
                          : "text-primary"
                      }
                    >
                      {interest.icon}
                    </div>
                    <span>{interest.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </section>

          {/* Daily Schedule Section */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Daily Schedule
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sun className="h-6 w-6 text-orange-500" />
                  <Label>Morning Brief</Label>
                </div>
                <input
                  type="time"
                  value={formatTime(morningBrief)}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value
                      .split(":")
                      .map(Number);
                    setMorningBrief({ hour, minute });
                  }}
                  className="rounded-lg border-input bg-transparent shadow-sm focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="h-6 w-6 text-indigo-500" />
                  <Label>Afternoon Brief</Label>
                </div>
                <input
                  type="time"
                  value={formatTime(afternoonBrief)}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value
                      .split(":")
                      .map(Number);
                    setAfternoonBrief({ hour, minute });
                  }}
                  className="rounded-lg border-input bg-transparent shadow-sm focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <Label>Wellbeing Check</Label>
                </div>
                <input
                  type="time"
                  value={formatTime(wellbeingCheck)}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value
                      .split(":")
                      .map(Number);
                    setWellbeingCheck({ hour, minute });
                  }}
                  className="rounded-lg border-input bg-transparent shadow-sm focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </section>

          {/* Privacy & Reporting Section */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Privacy & Reporting
              </h2>
            </div>
            <div className="space-y-4">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-accent"
                >
                  <Label className="text-base" htmlFor={key}>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) =>
                      setPrivacySettings((prev) => ({
                        ...prev,
                        [key]: checked,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          <Button
            className="w-full py-6 text-lg"
            size="lg"
            onClick={onComplete}
          >
            <span>Complete Setup</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
