import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "منصة تعليم البرمجة",
  description: "صفحة تعليمية تفاعلية لدروس البرمجة الأساسية"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <Navigation />
        <div className="flex min-h-screen flex-col">
          {children}
          <footer className="mt-10 border-t border-slate-800 bg-slate-900/95 px-6 py-5 text-center text-sm text-slate-400">
            تم العمل بواسطة بلال محمد احمد - تحت إشراف: د. ياسر
          </footer>
        </div>
      </body>
    </html>
  );
}
