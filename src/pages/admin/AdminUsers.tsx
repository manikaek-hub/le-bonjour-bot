import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { 
  Users, 
  Search, 
  Filter,
  Shield,
  User,
  Calendar,
  Mail,
  Phone,
  Edit,
  Crown,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  role: string;
  total_reservations: number;
  last_login: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      // Récupérer tous les profils utilisateurs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Récupérer les rôles des utilisateurs
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Récupérer le nombre de réservations par utilisateur
      const { data: reservationCounts, error: reservationsError } = await supabase
        .from('reservations')
        .select('user_id')
        .eq('status', 'confirmed');

      if (reservationsError) throw reservationsError;

      // Compter les réservations par utilisateur
      const reservationCountMap = reservationCounts?.reduce((acc, res) => {
        acc[res.user_id] = (acc[res.user_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Combiner toutes les données
      const usersWithData = profiles?.map(profile => {
        const userRole = userRoles?.find(role => role.user_id === profile.user_id);
        const reservationCount = reservationCountMap[profile.user_id] || 0;
        
        return {
          ...profile,
          role: userRole?.role || 'user',
          total_reservations: reservationCount,
          last_login: profile.updated_at // Approximation basée sur updated_at
        };
      }) || [];

      setUsers(usersWithData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par rôle
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      // Vérifier si l'utilisateur a déjà un rôle
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingRole) {
        // Mettre à jour le rôle existant
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
        
        if (error) throw error;
      } else {
        // Créer un nouveau rôle
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: newRole }]);
        
        if (error) throw error;
      }

      // Mettre à jour la liste locale
      setUsers(prev => 
        prev.map(user => 
          user.user_id === userId 
            ? { ...user, role: newRole }
            : user
        )
      );
      
      toast({
        title: "Succès",
        description: `Rôle mis à jour vers ${newRole === 'admin' ? 'Administrateur' : 'Utilisateur'}`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? 
      <Crown className="w-4 h-4 text-yellow-500" /> : 
      <User className="w-4 h-4 text-blue-500" />;
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Administrateur' : 'Utilisateur';
  };

  const getRoleVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p>Chargement des utilisateurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nom, téléphone ou ID utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Rôle</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les rôles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="admin">Administrateurs</SelectItem>
                    <SelectItem value="user">Utilisateurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{filteredUsers.length}</div>
              <p className="text-xs text-muted-foreground">Total affiché</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredUsers.filter(u => u.role === 'admin').length}
              </div>
              <p className="text-xs text-muted-foreground">Administrateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {filteredUsers.filter(u => u.role === 'user').length}
              </div>
              <p className="text-xs text-muted-foreground">Utilisateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {filteredUsers.filter(u => u.total_reservations > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">Clients actifs</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs</CardTitle>
            <CardDescription>
              {filteredUsers.length} utilisateur(s) trouvé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(user.role)}
                      <div>
                        <p className="font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ID: {user.user_id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <Badge variant={getRoleVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Téléphone</p>
                        <p className="text-muted-foreground">
                          {user.phone || 'Non renseigné'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Inscrit le</p>
                        <p className="text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Réservations</p>
                        <p className="text-muted-foreground">
                          {user.total_reservations} confirmée(s)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dernière activité : {new Date(user.last_login).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {user.role === 'user' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateUserRole(user.user_id, 'admin')}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          <Crown className="w-4 h-4 mr-1" />
                          Promouvoir Admin
                        </Button>
                      )}
                      
                      {user.role === 'admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateUserRole(user.user_id, 'user')}
                        >
                          <User className="w-4 h-4 mr-1" />
                          Rétrograder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}