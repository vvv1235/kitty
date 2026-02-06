'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth/provider";
import { adoptionService } from '@/services/adoptionService';
import { Pet } from '@/types/pet';
import { AdoptionRequest } from '@/types/adoption';
import { Heart, User, Mail, Calendar, Clock, Check, X, Eye, MessageSquare, Cat } from "lucide-react";

export default function AdoptionRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        if (user) {
          // Pegar todas as solicitações para pets do abrigo
          const requestsData = await adoptionService.getAdoptionRequestsByShelter(user.id);
          setRequests(requestsData);
        }
      } catch (err) {
        console.error('Error fetching adoption requests:', err);
        setError('Falha ao carregar as solicitações de adoção. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [user]);

  const updateRequestStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      const updatedRequest = await adoptionService.updateAdoptionRequestStatus(requestId, status);
      
      // Atualizar a lista localmente
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId ? {...req, status} : req
        )
      );
      
      alert(`Solicitação ${status === 'approved' ? 'aprovada' : 'rejeitada'} com sucesso!`);
    } catch (err) {
      console.error(`Error ${status === 'approved' ? 'approving' : 'rejecting'} adoption request:`, err);
      alert(`Falha ao ${status === 'approved' ? 'aprovar' : 'rejeitar'} solicitação. Por favor, tente novamente.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Solicitações de Adoção</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="card-kawaii overflow-hidden animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gray-200 rounded-full h-12 w-12" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii text-center p-8">
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <MessageSquare className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar solicitações</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Solicitações de Adoção</h1>
          <Badge variant="secondary" className="bg-pink-100 text-pink-800">
            {requests.length} {requests.length === 1 ? 'solicitação' : 'solicitações'}
          </Badge>
        </div>
        
        {requests.length === 0 ? (
          <Card className="card-kawaii text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 rounded-full p-4">
                  <MessageSquare className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma solicitação de adoção</h3>
              <p className="text-gray-600 mb-4">Você ainda não recebeu nenhuma solicitação de adoção para seus pets</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="card-kawaii overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-800 flex items-center">
                        <Cat className="h-5 w-5 text-pink-500 mr-2" />
                        {request.pet?.name || 'Pet'}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge 
                          className={
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {request.status === 'pending' ? 'Pendente' : 
                           request.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                        </Badge>
                      </div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-pink-100 text-pink-600">
                        {request.adopter?.email?.charAt(0).toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-pink-400" />
                      <span>{request.adopter?.email || 'Adotante'}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Solicitado em: {new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    {request.message && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-700 line-clamp-3">{request.message}</p>
                      </div>
                    )}
                    
                    {request.status === 'pending' && (
                      <div className="flex space-x-2 pt-3">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="flex-1"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    )}
                    
                    {request.status !== 'pending' && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 italic">
                          {request.status === 'approved' 
                            ? 'Solicitação aprovada' 
                            : 'Solicitação rejeitada'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}