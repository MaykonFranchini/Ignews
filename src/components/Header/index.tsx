import styles from './styles.module.scss';
import Image from 'next/image';
import LogoImg from '../../../public/images/logo.svg';
import { SignInButton } from '../SignInButton';
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={LogoImg} alt="ig.news logo" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}