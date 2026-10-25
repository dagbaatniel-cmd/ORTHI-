import React, { useEffect } from 'react';
import { X, Shield, Cookie, FileText, ShoppingCart } from 'lucide-react';
import { RESTAURANT_LOCATION } from '../utils/order';

export type LegalTab = 'confidentialite' | 'cookies' | 'utilisation' | 'vente';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#F8F5ED] rounded-2xl shadow-2xl border border-[#DEDFD7] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#DEDFD7]">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#E88A32] uppercase">
              ORTHI DÉLICES · INFORMATIONS LÉGALES
            </span>
            <h2 id="legal-modal-title" className="text-xl font-black text-[#174B35]">
              {activeTab === 'confidentialite' && 'Politique de confidentialité'}
              {activeTab === 'cookies' && 'Politique des cookies'}
              {activeTab === 'utilisation' && "Conditions d'utilisation"}
              {activeTab === 'vente' && 'Conditions de vente'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#656C65] hover:text-[#174B35] hover:bg-[#F8F5ED] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E88A32]"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DEDFD7] bg-white/70 px-6 gap-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => onTabChange('confidentialite')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'confidentialite'
                ? 'border-[#174B35] text-[#174B35]'
                : 'border-transparent text-[#656C65] hover:text-[#174B35]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#E88A32]" />
            <span>Confidentialité</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('cookies')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'border-[#174B35] text-[#174B35]'
                : 'border-transparent text-[#656C65] hover:text-[#174B35]'
            }`}
          >
            <Cookie className="w-3.5 h-3.5 text-[#E88A32]" />
            <span>Cookies</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('utilisation')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'utilisation'
                ? 'border-[#174B35] text-[#174B35]'
                : 'border-transparent text-[#656C65] hover:text-[#174B35]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#E88A32]" />
            <span>Utilisation</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('vente')}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'vente'
                ? 'border-[#174B35] text-[#174B35]'
                : 'border-transparent text-[#656C65] hover:text-[#174B35]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#E88A32]" />
            <span>Vente</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#656C65] leading-relaxed">
          {activeTab === 'confidentialite' && (
            <div>
              <p className="text-xs font-bold text-[#174B35] mb-2">Dernière mise à jour : 25 octobre 2026.</p>
              <p className="mb-4">
                La présente politique explique comment le site ORTHI DÉLICES traite les informations personnelles que les visiteurs peuvent fournir lorsqu’ils consultent le site ou préparent une commande.
              </p>
              
              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">1. Responsable du traitement</h3>
              <p>
                Le responsable du traitement est l’exploitant du restaurant ORTHI DÉLICES, situé à {RESTAURANT_LOCATION}.
              </p>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">2. Données susceptibles d’être collectées</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Votre nom.</li>
                <li>Le détail de votre commande.</li>
                <li>Le lieu de livraison ou de retrait.</li>
                <li>Les informations supplémentaires que vous choisissez de communiquer.</li>
              </ul>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">3. Finalités de l’utilisation des données</h3>
              <p>
                Les informations fournies servent à préparer un message de commande sur WhatsApp, répondre à vos demandes et organiser la livraison. Le site prépare le message qui s'ouvre dans WhatsApp ; aucune coordonnée bancaire n'est collectée en ligne.
              </p>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">4. Services externes</h3>
              <p>
                Le site propose des liens directs vers WhatsApp et une carte Google Maps. Ces services appliquent leurs propres règles de confidentialité.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div>
              <p className="text-xs font-bold text-[#174B35] mb-2">Dernière mise à jour : 25 octobre 2026.</p>
              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">1. Qu’est-ce qu’un cookie ?</h3>
              <p className="mb-4">
                Un cookie est un petit fichier ou paramètre stocké dans le navigateur. Sur ce site, le stockage local (<code className="bg-gray-100 px-1 py-0.5 rounded">localStorage</code>) est employé uniquement pour mémoriser vos préférences de navigation et vos choix concernant la bannière de consentement.
              </p>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">2. Utilisation actuelle</h3>
              <p className="mb-4">
                Aucun traceur publicitaire intrusif n'est activé. Les réglages de cookies peuvent être modifiés à tout moment via le lien dédié en bas de page.
              </p>
            </div>
          )}

          {activeTab === 'utilisation' && (
            <div>
              <p className="text-xs font-bold text-[#174B35] mb-2">Dernière mise à jour : 25 octobre 2026.</p>
              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">1. Objet</h3>
              <p className="mb-4">
                Les présentes conditions régissent l'accès au site ORTHI DÉLICES pour consulter notre carte, nos nouveautés burgers et préparer vos commandes sur WhatsApp.
              </p>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">2. Commandes et confirmation</h3>
              <p className="mb-4">
                La préparation d'un message sur le site ne constitue pas une commande définitive : celle-ci est validée d'un commun accord avec le restaurant après confirmation du stock, des prix et des délais de préparation sur WhatsApp.
              </p>
            </div>
          )}

          {activeTab === 'vente' && (
            <div>
              <p className="text-xs font-bold text-[#174B35] mb-2">Dernière mise à jour : 25 octobre 2026.</p>
              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">1. Prix et Disponibilité</h3>
              <p className="mb-4">
                Les prix affichés en FCFA sont indicatifs pour les plats à la carte. Les grillades de poissons ou viandes peuvent être ajustées selon la taille et l'arrivage frais du jour à Cotonou.
              </p>

              <h3 className="text-base font-bold text-[#174B35] mt-4 mb-2">2. Paiement et Livraison</h3>
              <p className="mb-4">
                Le paiement s'effectue selon les modalités convenues avec le restaurant (paiement à la livraison ou Mobile Money / MTN / Moov). Aucun paiement direct par carte n'est exigé sur le site web.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#DEDFD7] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#174B35] hover:bg-[#103526] text-white text-xs font-bold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
