
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Gavel, Users, PieChart, CheckCircle2, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import ProposalModal from "@/components/governance/ProposalModal";
import { useGovernance } from "@/hooks/useGovernance";

const Governance = () => {
  const { isConnected, connectWallet } = useWallet();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const { toast } = useToast();
  const { 
    activeProposals, 
    pastProposals, 
    userVotingPower, 
    totalVotes,
    castVote
  } = useGovernance();

  const handleVote = async (proposalId: string, support: boolean) => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      const result = await castVote(proposalId, support);
      if (result.success) {
        toast({
          title: "Vote recorded",
          description: "Your vote has been successfully recorded.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gold-gradient text-transparent bg-clip-text">
                Governance Platform
              </h1>
              <p className="text-gray-400 mt-2">
                Shape the future of BIT Access through decentralized decision-making
              </p>
            </div>

            {isConnected ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-400">Your Voting Power:</span>
                  <span className="text-xl font-bold text-bitaccess-gold">{userVotingPower} BIT</span>
                </div>
                <Button 
                  onClick={() => setShowProposalModal(true)}
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                >
                  <Gavel className="mr-2 h-4 w-4" /> 
                  Create Proposal
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet}
                className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              >
                Connect Wallet to Participate
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gavel className="text-bitaccess-gold h-5 w-5" />
                  Active Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{activeProposals.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="text-bitaccess-gold h-5 w-5" />
                  Total Votes Cast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{totalVotes}</div>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PieChart className="text-bitaccess-gold h-5 w-5" />
                  Proposals Executed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{pastProposals.filter(p => p.status === 'executed').length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6 bg-bitaccess-black border border-bitaccess-gold/20">
              <TabsTrigger value="active">Active Proposals</TabsTrigger>
              <TabsTrigger value="past">Past Proposals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeProposals.length > 0 ? (
                <div className="space-y-6">
                  {activeProposals.map((proposal) => (
                    <Card key={proposal.id} className="bg-bitaccess-black-light border-bitaccess-gold/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{proposal.title}</CardTitle>
                            <CardDescription className="mt-1">
                              Proposal #{proposal.id.slice(-4)}
                            </CardDescription>
                          </div>
                          <Badge 
                            className={
                              proposal.status === 'active' 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-yellow-600 hover:bg-yellow-700'
                            }
                          >
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-gray-300 mb-4">{proposal.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Voting Progress</span>
                            <span className="text-gray-400">
                              {proposal.votes} votes
                            </span>
                          </div>
                          <Progress value={75} className="h-2 bg-gray-700" />
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Ends in {Math.ceil((proposal.endTime - Date.now()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-bitaccess-gold/10 pt-4 flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => handleVote(proposal.id, true)}
                          className="border-bitaccess-gold/30 text-green-400 hover:bg-green-950/30"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" /> 
                          Support
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleVote(proposal.id, false)}
                          className="border-bitaccess-gold/30 text-red-400 hover:bg-red-950/30"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" /> 
                          Against
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-bitaccess-black-light inline-block p-4 rounded-full mb-4">
                    <Gavel className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Active Proposals</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    There are no active proposals at the moment. Connect your wallet and create a proposal to get started.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastProposals.length > 0 ? (
                <div className="space-y-6">
                  {pastProposals.map((proposal) => (
                    <Card key={proposal.id} className="bg-bitaccess-black-light border-bitaccess-gold/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{proposal.title}</CardTitle>
                            <CardDescription className="mt-1">
                              Proposal #{proposal.id.slice(-4)}
                            </CardDescription>
                          </div>
                          <Badge 
                            className={
                              proposal.status === 'executed' 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-red-600 hover:bg-red-700'
                            }
                          >
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{proposal.description}</p>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Final Result</span>
                            <span className="text-gray-400">
                              {proposal.votes} votes
                            </span>
                          </div>
                          <Progress 
                            value={proposal.status === 'executed' ? 100 : 40} 
                            className={`h-2 ${proposal.status === 'executed' ? 'bg-green-900/40' : 'bg-red-900/40'}`} 
                          />
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                          <CheckCircle2 className="h-4 w-4 mr-1 text-gray-400" />
                          <span>
                            Ended {Math.ceil((Date.now() - proposal.endTime) / (1000 * 60 * 60 * 24))} days ago
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-bitaccess-black-light inline-block p-4 rounded-full mb-4">
                    <CheckCircle2 className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Past Proposals</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    There are no past proposals yet. Once proposals are completed, they will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {showProposalModal && (
        <ProposalModal 
          open={showProposalModal} 
          onClose={() => setShowProposalModal(false)} 
        />
      )}
    </Layout>
  );
};

export default Governance;
