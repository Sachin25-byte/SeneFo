'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <AffiliateDisclosure />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
