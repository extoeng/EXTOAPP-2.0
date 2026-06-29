import { ArrowLeft, Mail, Briefcase, User, Phone, Smartphone, Lock, Eye, EyeOff, Check } from 'lucide-react'
import { useState } from 'react'
import type { AuthUser } from '../services/auth'

interface Props {
  user: AuthUser
  onBack: () => void
}

function InfoCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-[14px] px-[20px] py-[16px] flex items-center gap-[14px]">
      <div className="w-[38px] h-[38px] rounded-[10px] bg-tile-bg flex items-center justify-center flex-shrink-0">
        <Icon size={18} strokeWidth={1.7} className="text-icon-default" />
      </div>
      <div>
        <div className="font-archivo font-semibold text-[11px] tracking-[0.08em] uppercase text-label mb-[2px]">{label}</div>
        <div className="font-hanken text-[14px] text-ink">{value || '—'}</div>
      </div>
    </div>
  )
}

export function ProfilePage({ user, onBack }: Props) {
  const [showChange, setShowChange] = useState(false)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const canSave = current.length > 0 && next.length >= 6 && next === confirm

  const handleSave = () => {
    if (!canSave) return
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setShowChange(false)
      setCurrent(''); setNext(''); setConfirm('')
    }, 1800)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-[14px] px-[24px] py-[16px] border-b border-border flex-shrink-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-[6px] border-none bg-transparent cursor-pointer font-hanken font-medium text-[13px] text-text-muted hover:text-ink transition-colors duration-150 p-0"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Voltar
        </button>
        <span className="text-border">|</span>
        <span className="font-archivo font-semibold text-[14px] text-ink">Meu Perfil</span>
      </div>

      <div className="flex-1 overflow-y-auto px-[24px] py-[32px]">
        <div className="max-w-[480px] mx-auto flex flex-col gap-[24px]">

          {/* Avatar + nome */}
          <div className="flex flex-col items-center gap-[14px]">
            <div className="w-[80px] h-[80px] rounded-full bg-avatar-bg text-white flex items-center justify-center font-archivo font-semibold text-[28px] flex-shrink-0">
              {user.initials}
            </div>
            <div className="text-center">
              <div className="font-archivo font-semibold text-[22px] text-ink leading-[1.2]">{user.name}</div>
              <div className="font-hanken text-[14px] text-text-faint mt-[4px]">{user.role}</div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-[10px]">
            <InfoCard icon={User}     label="Nome"   value={user.name} />
            <InfoCard icon={Briefcase} label="Cargo" value={user.role} />
            <InfoCard icon={Mail}     label="E-mail" value={user.email ?? ''} />

            {/* Ramal + Celular lado a lado */}
            <div className="flex gap-[10px]">
              <div className="flex-1 bg-surface border border-border rounded-[14px] px-[20px] py-[16px] flex items-center gap-[14px]">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-tile-bg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} strokeWidth={1.7} className="text-icon-default" />
                </div>
                <div>
                  <div className="font-archivo font-semibold text-[11px] tracking-[0.08em] uppercase text-label mb-[2px]">Ramal</div>
                  <div className="font-hanken text-[14px] text-ink">—</div>
                </div>
              </div>
              <div className="flex-1 bg-surface border border-border rounded-[14px] px-[20px] py-[16px] flex items-center gap-[14px]">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-tile-bg flex items-center justify-center flex-shrink-0">
                  <Smartphone size={18} strokeWidth={1.7} className="text-icon-default" />
                </div>
                <div>
                  <div className="font-archivo font-semibold text-[11px] tracking-[0.08em] uppercase text-label mb-[2px]">Celular</div>
                  <div className="font-hanken text-[14px] text-ink">—</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trocar senha */}
          <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
            <button
              onClick={() => setShowChange(v => !v)}
              className="w-full flex items-center gap-[14px] px-[20px] py-[16px] border-none bg-transparent cursor-pointer text-left transition-colors duration-150 hover:bg-tile-bg"
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-tile-bg flex items-center justify-center flex-shrink-0">
                <Lock size={18} strokeWidth={1.7} className="text-icon-default" />
              </div>
              <div className="flex-1">
                <div className="font-archivo font-semibold text-[11px] tracking-[0.08em] uppercase text-label mb-[2px]">Segurança</div>
                <div className="font-hanken text-[14px] text-ink">Trocar senha</div>
              </div>
              <span className="font-hanken text-[12px] text-text-faint">{showChange ? 'Fechar' : 'Alterar'}</span>
            </button>

            {showChange && (
              <div className="px-[20px] pb-[20px] flex flex-col gap-[12px] border-t border-border pt-[16px]">
                {(['Senha atual', 'Nova senha', 'Confirmar nova senha'] as const).map((label, i) => {
                  const val    = [current, next, confirm][i]
                  const setVal = [setCurrent, setNext, setConfirm][i]
                  const show   = [showCurrent, showNext, showConfirm][i]
                  const toggle = [() => setShowCurrent(v => !v), () => setShowNext(v => !v), () => setShowConfirm(v => !v)][i]
                  const isError = i === 2 && confirm.length > 0 && confirm !== next

                  return (
                    <div key={label}>
                      <label className="block font-archivo font-semibold text-[11px] tracking-[0.08em] uppercase text-label mb-[6px]">{label}</label>
                      <div className={`flex items-center bg-bg-app border rounded-[10px] px-[14px] gap-[8px] transition-colors ${isError ? 'border-red-400' : 'border-border'}`}>
                        <input
                          type={show ? 'text' : 'password'}
                          value={val}
                          onChange={e => setVal(e.target.value)}
                          className="flex-1 bg-transparent py-[11px] font-hanken text-[14px] text-ink outline-none border-none"
                          placeholder="••••••••"
                        />
                        <button onClick={toggle} className="border-none bg-transparent cursor-pointer text-text-faint hover:text-ink p-0">
                          {show ? <EyeOff size={16} strokeWidth={1.7} /> : <Eye size={16} strokeWidth={1.7} />}
                        </button>
                      </div>
                      {isError && <p className="font-hanken text-[12px] text-red-500 mt-[4px]">As senhas não coincidem</p>}
                      {i === 1 && next.length > 0 && next.length < 6 && <p className="font-hanken text-[12px] text-text-faint mt-[4px]">Mínimo 6 caracteres</p>}
                    </div>
                  )
                })}

                <button
                  onClick={handleSave}
                  disabled={!canSave}
                  className="mt-[4px] inline-flex items-center justify-center gap-[8px] bg-accent text-white border-none rounded-[10px] px-[20px] py-[11px] font-hanken font-semibold text-[14px] cursor-pointer transition-all duration-150 hover:brightness-[0.93] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saved ? <><Check size={16} strokeWidth={2} /> Senha alterada!</> : 'Salvar nova senha'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
