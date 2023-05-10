<v-card variant="plain">
                  <v-card-title> Category </v-card-title>
                  <v-card-text>
                    <v-expansion-panels
                      multiple
                      variant="accordion"
                      class="my-4"
                      theme="dark"
                    >
                      <v-expansion-panel
                        v-for="(cat, id) of category"
                        :key="id"
                      >
                        <v-expansion-panel-title>
                          <h4>Coding</h4>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-card variant="plain">
                            <v-card-item v-for="cd in cat.coding" :key="cd">
                              <v-text-field
                                variant="underlined"
                                label="System"
                                v-model="cd.system"
                              />
                              <v-text-field
                                variant="underlined"
                                label="Code"
                                v-model="cd.code"
                              />
                              <v-text-field
                                variant="underlined"
                                label="Display"
                                v-model="cd.display"
                              />
                            </v-card-item>
                          </v-card>
                        </v-expansion-panel-text>
                        <v-expansion-panel-text>
                          <v-card-item>
                            <v-text-field
                              variant="underlined"
                              label="Text"
                              v-model="cat.text"
                            />
                          </v-card-item>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card-text>
                </v-card>