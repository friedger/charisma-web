
import { SkipNavContent } from '@reach/skip-nav';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';
import ParticleBackground from '@components/lp/ParticleBackground';
import Layout from '@components/layout';
import Hero from '@components/npc/hero';
import styleUtils from '@components/utils.module.css';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

export default function ForNpcPage() {
  const meta = {
    title: 'Charisma | Attract and Reward Your Community',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta} fullViewport>
      <ParticleBackground />
      <SkipNavContent />
      <Layout>
        <div className={cn(styleUtils.container, 'flex flex-col')}>
          <Hero />
          <Button type="submit" className={cn('self-center', styleUtils.appear, styleUtils['appear-eighth'], 'mb-4')}>Join Discord to Get Started</Button>
        </div>
      </Layout>
    </Page>
  );
}
