package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import pe.com.cd.domain.enumeration.MedioDePago;

/**
 * A DepositoPersona.
 */
@Entity
@Table(name = "deposito_persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "depositopersona")
public class DepositoPersona implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_deposito")
    private String numeroDeposito;

    @Column(name = "monto", precision = 10, scale = 2)
    private BigDecimal monto;

    @Lob
    @Column(name = "constancia_adjunto")
    private byte[] constanciaAdjunto;

    @Column(name = "constancia_adjunto_content_type")
    private String constanciaAdjuntoContentType;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_deposito")
    private MedioDePago tipoDeposito;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Banco banco;

    @OneToOne
    @JoinColumn(unique = true)
    private Moneda moneda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroDeposito() {
        return numeroDeposito;
    }

    public DepositoPersona numeroDeposito(String numeroDeposito) {
        this.numeroDeposito = numeroDeposito;
        return this;
    }

    public void setNumeroDeposito(String numeroDeposito) {
        this.numeroDeposito = numeroDeposito;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public DepositoPersona monto(BigDecimal monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public byte[] getConstanciaAdjunto() {
        return constanciaAdjunto;
    }

    public DepositoPersona constanciaAdjunto(byte[] constanciaAdjunto) {
        this.constanciaAdjunto = constanciaAdjunto;
        return this;
    }

    public void setConstanciaAdjunto(byte[] constanciaAdjunto) {
        this.constanciaAdjunto = constanciaAdjunto;
    }

    public String getConstanciaAdjuntoContentType() {
        return constanciaAdjuntoContentType;
    }

    public DepositoPersona constanciaAdjuntoContentType(String constanciaAdjuntoContentType) {
        this.constanciaAdjuntoContentType = constanciaAdjuntoContentType;
        return this;
    }

    public void setConstanciaAdjuntoContentType(String constanciaAdjuntoContentType) {
        this.constanciaAdjuntoContentType = constanciaAdjuntoContentType;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public DepositoPersona fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public MedioDePago getTipoDeposito() {
        return tipoDeposito;
    }

    public DepositoPersona tipoDeposito(MedioDePago tipoDeposito) {
        this.tipoDeposito = tipoDeposito;
        return this;
    }

    public void setTipoDeposito(MedioDePago tipoDeposito) {
        this.tipoDeposito = tipoDeposito;
    }

    public String getEstado() {
        return estado;
    }

    public DepositoPersona estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public DepositoPersona usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Banco getBanco() {
        return banco;
    }

    public DepositoPersona banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public DepositoPersona moneda(Moneda moneda) {
        this.moneda = moneda;
        return this;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DepositoPersona depositoPersona = (DepositoPersona) o;
        if (depositoPersona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), depositoPersona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DepositoPersona{" +
            "id=" + getId() +
            ", numeroDeposito='" + getNumeroDeposito() + "'" +
            ", monto=" + getMonto() +
            ", constanciaAdjunto='" + getConstanciaAdjunto() + "'" +
            ", constanciaAdjuntoContentType='" + getConstanciaAdjuntoContentType() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", tipoDeposito='" + getTipoDeposito() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
