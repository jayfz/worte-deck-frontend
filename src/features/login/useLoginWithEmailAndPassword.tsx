import { useApplicationContext } from '@/context/useApplicationContext';
import { loginWithEmailAndPassword } from '@/services/ApiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLoginWithEmailAndPassword() {
  const { appLogin } = useApplicationContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: regularLoginQuery, isPending: isPendingRegularLogin } = useMutation({
    mutationFn: loginWithEmailAndPassword,

    onSuccess: (authenticatedUser) => {
      toast.success('Succesfully logged in!');
      queryClient.setQueryData(['token'], authenticatedUser);
      appLogin(authenticatedUser);
      navigate('/app', { replace: true });
    },

    onError: () => {
      toast.error('Unable to log you in');
    },
  });

  return { regularLoginQuery, isPendingRegularLogin };
}
