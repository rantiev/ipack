import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/_app/app.module'
import { environment } from './environments/environment'
import { worker } from './mocks/browser'

if (environment.production) {
  enableProdMode()
}

;(async () => {
  if (environment.mockApi === true) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass'
    })
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err))
})()
