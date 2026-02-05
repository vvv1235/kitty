import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Configurações da Conta</h1>
      <form className="mt-4 space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <Button type="submit">Salvar alterações</Button>
      </form>
    </div>
  )
}