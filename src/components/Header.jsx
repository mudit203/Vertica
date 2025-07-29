// "use client"

// import Link from 'next/link'

// export default function Header() {
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto px-4 py-4">
//         <nav className="flex items-center justify-between">
//           <Link href="/" className="text-xl font-bold hover:text-blue-200">
//             Vertica App
//           </Link>
//           <div className="flex gap-4">
//             <Link 
//               href="/" 
//               className="hover:text-blue-200 transition-colors"
//             >
//               Home
//             </Link>
//             <button 
//               onClick={() => scrollToSection('movies')}
//               className="hover:text-blue-200 transition-colors"
//             >
//               Movies
//             </button>
//             <button 
//               onClick={() => scrollToSection('series')}
//               className="hover:text-blue-200 transition-colors"
//             >
//               Series
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   )
// }
