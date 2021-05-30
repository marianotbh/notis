import {Category} from '../api/io'
import useSettings from '../hooks/useSettings'

export type SettingsProps = {
  categories: Category[]
  onChange(categoryId: string, enabled: boolean): void
}

export default function Settings({categories, onChange}: SettingsProps) {
  const {data, isLoading} = useSettings()

  if (isLoading) return <h2>loading...</h2>

  const isEnabled = (categoryId: string) =>
    data?.categories.includes(categoryId) ?? false

  return (
    <div>
      <h2>subscribirse a categorias:</h2>

      <div>
        {categories.map(({id, description}) => (
          <div key={id}>
            <label>
              <input
                type="checkbox"
                checked={isEnabled(id)}
                onChange={({target: {checked}}) => onChange(id, checked)}
              />
              {description}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
