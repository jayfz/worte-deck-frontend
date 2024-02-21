import { useApplicationContext } from '@/context/useApplicationContext';
import { loginWithGoogle } from '@/services/ApiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLoginWithGoogle() {
  const { appLogin } = useApplicationContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: googleLoginQuery, isPending: isPendingGoogleLogin } = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: (authenticatedUser) => {
      toast.success('Succesfully logged in!');
      queryClient.setQueryData(['token'], authenticatedUser);
      appLogin(authenticatedUser);
      navigate('/app', { replace: true });
    },

    onError: () => {
      toast.error('Unable to verify your Google identity');
    },
  });

  return { googleLoginQuery, isPendingGoogleLogin };
}
