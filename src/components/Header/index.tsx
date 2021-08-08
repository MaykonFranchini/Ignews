import styles from './styles.module.scss';
import Image from 'next/image';
import LogoImg from '../../../public/images/logo.svg';
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={LogoImg} alt="ig.news logo" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href='/'>
                    <a>Home</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href='/posts' >
                    <a >Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}