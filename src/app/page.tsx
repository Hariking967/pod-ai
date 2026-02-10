import HomeView from '@/modules/home/ui/views/home-view';
import { LandingView } from '@/modules/landing/ui/views/landing-view';
import {auth} from '@/lib/auth'
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session){
    return <LandingView />
  }
  return (
    <HomeView></HomeView>
  );
}
