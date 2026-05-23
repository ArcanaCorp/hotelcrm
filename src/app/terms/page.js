export default function Page () {
    return (
        <div className="w m-auto py-lg md:w flex flex-col gap-lg" style={{"--w": "60%", "--w-md": "90%"}}>
            <section className="w-full bg-white rounded-md p-md border-surface flex flex-col gap-md" id="terms">
                <div className="w-full flex flex-col gap-xs">
                    <h2 className="font-bold text-xl">TÉRMINOS Y CONDICIONES DE USO</h2>
                    <p className="text-xs text-muted flex flex-col gap-xs">
                        <span className="block">Fecha de actualización: 23 de mayo de 2026</span>
                        <span className="block">Empresa: ARCANA CORP S.A.C.</span>
                        <span className="block">RUC: 20612123901</span>
                    </p>
                </div>
                <ul className="w-full flex flex-col gap-md">
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">1. INTRODUCCIÓN</h3>
                        <div className="text-body-md text-on-background">
                            Bienvenido a Ándale Hotel CRM, plataforma tecnológica
                            desarrollada y operada por ARCANA CORP S.A.C.
                            <br /><br />
                            El presente documento regula el acceso, uso y
                            funcionamiento de los servicios, plataformas,
                            aplicaciones, sistemas y herramientas digitales
                            proporcionadas por ARCANA CORP S.A.C.
                            <br /><br />
                            Al utilizar cualquiera de nuestros servicios, el usuario
                            declara haber leído, entendido y aceptado íntegramente
                            los presentes términos y condiciones.
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">2. DEFINICIONES</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>Para efectos del presente documento:</p>
                            <ul className="ml-md capitalize">
                                <li><b>“Plataforma”</b>: hace referencia a Ándale Hotel CRM y demás productos digitales desarrollados por ARCANA CORP S.A.C.</li>
                                <li><b>“Usuario”</b>: corresponde a cualquier persona natural o jurídica que acceda, utilice o administre la plataforma.</li>
                                <li><b>“Cliente”</b>: corresponde a huéspedes, usuarios finales o terceros cuyos datos sean registrados dentro del sistema.</li>
                                <li><b>“Servicios”</b>: incluye software, aplicaciones web, APIs, paneles administrativos, herramientas digitales y funcionalidades relacionadas.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">3. OBJETO DEL SERVICIO</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>
                                <b>Ándale Hotel CRM</b> tiene como finalidad proporcionar
                                herramientas de gestión hotelera y administración
                                operativa para hoteles, hostales, alojamientos
                                turísticos y establecimientos relacionados.
                            </p>
                            <p>La plataforma permite gestionar:</p>
                            <ul className="ml-md capitalize">
                                <li>- reservas</li>
                                <li>- habitaciones</li> 
                                <li>- huéspedes</li>
                                <li>- clientes</li>
                                <li>- pagos</li>
                                <li>- estadísticas</li>
                                <li>- reportes</li>
                                <li>- operaciones administrativas</li>
                                <li>- integraciones digitales</li>
                            </ul>
                            <p>
                                <b>ARCANA CORP S.A.C.</b> podrá incorporar nuevas
                                funcionalidades, módulos o integraciones sin necesidad
                                de autorización previa del usuario.
                            </p>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">4. CUENTAS Y AUTENTICACIÓN</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>
                                Las cuentas de usuario registradas dentro de Ándale
                                Hotel CRM podrán estar vinculadas al ecosistema
                                tecnológico de ARCANA CORP S.A.C.
                            </p>
                            <p>
                                Esto implica que las credenciales de autenticación
                                podrán ser utilizadas para acceder a otros productos,
                                servicios o plataformas pertenecientes a ARCANA CORP S.A.C.
                            </p>
                            <p>El usuario es responsable de:</p>
                            <ul className="ml-md capitalize">
                                <li>- mantener la confidencialidad de sus credenciales</li>
                                <li>- restringir accesos no autorizados</li>
                                <li>- proteger sus dispositivos y sesiones activas</li>
                                <li>- informar inmediatamente cualquier uso sospechoso</li>
                            </ul>
                            <p>
                                ARCANA CORP S.A.C. no será responsable por accesos
                                derivados de negligencia, pérdida de credenciales o
                                uso indebido por parte del usuario.
                            </p>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">5. USO PERMITIDO</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>El usuario se compromete a utilizar la plataforma únicamente para fines legales y autorizados.</p>
                            <p>Queda estrictamente prohibido:</p>
                            <ul className="ml-md capitalize">
                                <li>- vulnerar la seguridad del sistema</li>
                                <li>- intentar acceder a información no autorizada</li>
                                <li>- realizar ingeniería inversa</li>
                                <li>- copiar funcionalidades</li>
                                <li>- extraer bases de datos</li>
                                <li>- automatizar accesos no permitidos</li>
                                <li>- distribuir malware</li>
                                <li>- afectar la disponibilidad del servicio</li>
                                <li>- utilizar el sistema para actividades ilícitas</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">6. DISPONIBILIDAD DEL SERVICIO</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>
                                ARCANA CORP S.A.C. realizará esfuerzos razonables
                                para mantener la disponibilidad y continuidad de la
                                plataforma.
                            </p>
                            <p>Sin embargo, el usuario acepta que podrán existir:</p>
                            <ul className="ml-md capitalize">
                                <li>- mantenimientos programados</li>
                                <li>- interrupciones temporales</li>
                                <li>- actualizaciones</li>
                                <li>- fallos externos</li>
                                <li>- incidencias de terceros</li>
                                <li>- eventos de fuerza mayor</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">7. PROPIEDAD INTELECTUAL</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>Todos los elementos relacionados con Ándale Hotel CRM son propiedad exclusiva de ARCANA CORP S.A.C.</p>
                            <p>Esto incluye:</p>
                            <ul className="ml-md capitalize">
                                <li>- software</li>
                                <li>- código fuente</li>
                                <li>- arquitectura</li>
                                <li>- diseño visual</li>
                                <li>- marca</li>
                                <li>- logotipos</li>
                                <li>- componentes</li>
                                <li>- documentación</li>
                                <li>- estructura de base de datos</li>
                                <li>- funcionalidades</li>
                            </ul>
                            <p>Queda prohibida cualquier reproducción, redistribución, modificación o explotación sin autorización previa y por escrito.</p>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">8. LIMITACIÓN DE RESPONSABILIDAD</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>ARCANA CORP S.A.C. no será responsable por:</p>
                            <ul className="ml-md capitalize">
                                <li>- pérdidas económicas indirectas</li>
                                <li>- interrupciones causadas por terceros</li>
                                <li>- errores derivados de información ingresada por usuarios</li>
                                <li>- daños ocasionados por uso indebido de la plataforma</li>
                                <li>- ataques informáticos externos</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">9. ACTUALIZACIONES DE LOS TÉRMINOS</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>ARCANA CORP S.A.C. podrá modificar los presentes términos y condiciones en cualquier momento.</p>
                            <p>Las actualizaciones podrán notificarse mediante:</p>
                            <ul className="ml-md capitalize">
                                <li>• WhatsApp</li>
                                <li>• correo electrónico</li>
                                <li>• notificaciones internas</li>
                                <li>• canales oficiales de comunicación</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
            <section className="w-full bg-white rounded-md p-md border-surface flex flex-col gap-md" id="privacy">
                <div className="w-full flex flex-col gap-xs">
                    <h2 className="font-bold text-xl">POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</h2>
                    <p className="text-xs text-muted flex flex-col gap-xs">
                        <span className="block">Fecha de actualización: 23 de mayo de 2026</span>
                        <span className="block">Empresa: ARCANA CORP S.A.C.</span>
                        <span className="block">RUC: 20612123901</span>
                    </p>
                </div>
                <ul className="w-full flex flex-col gap-md">
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">1. INFORMACIÓN RECOPILADA</h3>
                        <div className="text-body-md text-on-background">
                            <p>La plataforma podrá recopilar información relacionada con usuarios y clientes, incluyendo:</p>
                            <ul className="ml-md capitalize">
                                <li>- nombres y apellidos</li>
                                <li>- DNI</li>
                                <li>- pasaporte</li>
                                <li>- correo electrónico</li>
                                <li>- teléfono</li>
                                <li>- dirección</li>
                                <li>- información de reservas</li>
                                <li>- actividad dentro de la plataforma</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">2. DATOS SENSIBLES</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>ARCANA CORP S.A.C. implementa medidas técnicas y organizativas destinadas a proteger información sensible.</p>
                            <p>Los siguientes datos podrán almacenarse mediante mecanismos de cifrado y protección avanzada:</p>
                            <ul className="ml-md capitalize">
                                <li>DNI</li>
                                <li>pasaporte</li>
                                <li>documentos de identidad</li>
                                <li>información crítica de clientes</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">3. FINALIDAD DEL USO DE DATOS</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>La información recopilada podrá utilizarse para:</p>
                            <ul className="ml-md capitalize">
                                <li>- autenticación de usuarios</li>
                                <li>- administración hotelera</li>
                                <li>- reservas</li>
                                <li>- soporte técnico</li>
                                <li>- estadísticas</li>
                                <li>- seguridad del sistema</li>
                                <li>- mejoras del producto</li>
                                <li>- comunicaciones operativas y comerciales</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">4. COMUNICACIONES Y PUBLICIDAD</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>El usuario autoriza a ARCANA CORP S.A.C. a enviar comunicaciones relacionadas con:</p>
                            <ul className="ml-md capitalize">
                                <li>- novedades del sistema</li>
                                <li>- promociones</li>
                                <li>- publicidad</li>
                                <li>- campañas comerciales</li>
                                <li>- nuevos productos</li>
                                <li>- actualizaciones</li>
                            </ul>
                            <p>Estas comunicaciones podrán realizarse mediante:</p>
                            <ul className="ml-md capitalize">
                                <li>- correo electrónico</li>
                                <li>- WhatsApp</li>
                                <li>- notificaciones internas</li>
                            </ul>
                        </div>
                    </li>
                    <li className="w-full flex flex-col gap-sm">
                        <h3 className="font-semibold text-lg">5. ACTUALIZACIONES DE LA POLÍTICA</h3>
                        <div className="text-body-md text-on-background flex flex-col gap-sm">
                            <p>ARCANA CORP S.A.C. podrá modificar la presente política en cualquier momento.</p>
                            <p>Las modificaciones serán notificadas mediante:</p>
                            <ul className="ml-md capitalize">
                                <li>- WhatsApp</li>
                                <li>- correo electrónico</li>
                                <li>- canales oficiales de comunicación</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}