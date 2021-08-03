import { GetStaticProps } from 'next';

import Head from 'next/head'
import Image from 'next/image';
import AvatarImg from '../../public/images/avatar.svg';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';


// Client-Side
// Server-Side
// Ststic Site Generation

//post do blog 

// Conteudo (SSG - Static Site Generation)
// Coments (Client-Side)


interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br />
          <span>for {product.amount} /month</span></p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <Image src={AvatarImg} alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JKFpFGgA9C0vCEsNpak5e1P')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'GBP'
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60*60*24, //24 hours
  }

}