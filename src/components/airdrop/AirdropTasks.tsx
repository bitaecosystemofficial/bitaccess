
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Trophy, Users, MessageSquare, Share2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

interface AirdropTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  icon: React.ReactNode;
  action?: () => void;
}

const AirdropTasks = () => {
  const { isConnected } = useWallet();
  const [tasks, setTasks] = useState<AirdropTask[]>([
    {
      id: "1",
      title: "Join Telegram Community",
      description: "Join our official Telegram channel and stay updated",
      reward: 100,
      completed: false,
      icon: <MessageSquare className="w-5 h-5" />,
      action: () => window.open("https://t.me/bitaccess", "_blank")
    },
    {
      id: "2",
      title: "Follow on Twitter/X",
      description: "Follow our official Twitter account",
      reward: 50,
      completed: false,
      icon: <Users className="w-5 h-5" />,
      action: () => window.open("https://twitter.com/bitaccess", "_blank")
    },
    {
      id: "3",
      title: "Share on Social Media",
      description: "Share our project on your social media",
      reward: 75,
      completed: false,
      icon: <Share2 className="w-5 h-5" />
    },
    {
      id: "4",
      title: "Complete KYC",
      description: "Complete your Know Your Customer verification",
      reward: 200,
      completed: false,
      icon: <Trophy className="w-5 h-5" />
    }
  ]);

  const handleCompleteTask = async (taskId: string) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to complete tasks",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate task completion
      await new Promise(resolve => setTimeout(resolve, 1000));

      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, completed: true }
            : task
        )
      );

      const task = tasks.find(t => t.id === taskId);
      if (task) {
        toast({
          title: "Task Completed!",
          description: `You earned ${task.reward} BIT tokens`,
        });
      }
    } catch (error) {
      console.error("Error completing task:", error);
      toast({
        title: "Error",
        description: "Failed to complete task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const totalRewards = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.reward, 0);
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Rewards</p>
                <p className="text-lg font-semibold">{totalRewards} BIT</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-lg font-semibold">{completedTasks}/{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-lg font-semibold">{tasks.length - completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className={task.completed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${task.completed ? "bg-green-100" : "bg-blue-100"}`}>
                    {task.completed ? <CheckCircle className="w-5 h-5 text-green-600" /> : task.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={task.completed ? "default" : "secondary"}>
                  {task.reward} BIT
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {task.completed ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
                {!task.completed && (
                  <Button 
                    onClick={() => {
                      if (task.action) {
                        task.action();
                        // Add a delay before marking as completed
                        setTimeout(() => handleCompleteTask(task.id), 2000);
                      } else {
                        handleCompleteTask(task.id);
                      }
                    }}
                    size="sm"
                  >
                    Complete Task
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AirdropTasks;
