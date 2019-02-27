package pe.com.cd.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(pe.com.cd.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(pe.com.cd.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Persona.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Persona.class.getName() + ".direccions", jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Persona.class.getName() + ".telefonos", jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TipoDocumento.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TelefonoPersona.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.UsuarioRol.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Rol.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Permiso.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.CuentaBancaria.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.DireccionPersona.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Moneda.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.Banco.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.DepositoPersona.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TransaccionPersona.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TransaccionCambista.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.DepositoCambista.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TipoCambio.class.getName(), jcacheConfiguration);
            cm.createCache(pe.com.cd.domain.TipoCambioVariacion.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
