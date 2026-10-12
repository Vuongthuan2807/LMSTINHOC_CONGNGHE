import React from 'react';
import { Sparkles, Heart, ShieldCheck, Database, Phone, Mail, MapPin } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAppStore();

  return (
    <footer className="bg-white border-t border-sky-100 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Introduction */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-sky-950">
                HỌC VUI TIN HỌC & CÔNG NGHỆ
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Hệ thống học tập trực quan và trò chơi giáo dục số hóa dành riêng cho học sinh Tiểu học từ Lớp 1 đến Lớp 5 theo Chương trình GDPT 2018. Giúp các em phát triển tư duy công nghệ, kỹ năng tin học và sự an toàn trong kỷ nguyên số.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold bg-sky-50 px-3 py-2 rounded-xl border border-sky-200 w-fit">
              <Database className="w-4 h-4 text-sky-500" />
              <span>Dữ liệu lưu an toàn trên máy của bạn (LocalStorage & IndexedDB)</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Khám Phá Nhanh
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Trang chủ học sinh
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Khóa học Tin học & Công nghệ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('exercises')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Kho bài tập tương tác
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('games')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Góc vui chơi & Rèn luyện
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-sky-600 transition-colors text-amber-700 font-bold"
                >
                  Cổng Giáo viên & Quản trị
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Liên Hệ Giáo Viên
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Phòng Tin học Tiểu học - Trường Tiểu Học Sáng Tạo</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hotline: 0988.123.456 (Thầy Tuấn GV Tin học)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Email: hocvuitinhoc@tieuhoc.edu.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Bảo mật an toàn cho trẻ em</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Học Vui Tin Học & Công Nghệ. Thiết kế dành cho học sinh tiểu học Việt Nam.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Đồng hành cùng bé lớn khôn với niềm vui học tập</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
